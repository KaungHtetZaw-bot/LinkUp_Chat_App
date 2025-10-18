// src/hooks/useFriendsWithLastMessage.js
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const LOCAL_KEY_PREFIX = "friends_cache_";

const useFriendsWithLastMessage = () => {
  const { currentUser } = useAuth();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (!currentUser?.uid) return;
    const cacheKey = `${LOCAL_KEY_PREFIX}${currentUser.uid}`;

    // 1) Load cached friends (if any) and normalize lastMessageTime to a number (ms)
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const normalized = parsed.map((f) => {
          // convert possible string timestamp to ms
          let lm = f.lastMessageTime;
          if (typeof lm === "string") {
            const parsedMs = Date.parse(lm);
            lm = isNaN(parsedMs) ? null : parsedMs;
          } else if (typeof lm !== "number") {
            lm = null;
          }
          return { ...f, lastMessageTime: lm };
        });
        setFriends(normalized);
      } catch (e) {
        console.warn("Failed to parse friends cache:", e);
      }
    }

    // 2) Start listening to Firestore and overwrite/merge live updates
    const userRef = doc(db, "users", currentUser.uid);
    let chatUnsubs = [];

    const unsubUser = onSnapshot(userRef, async (userSnap) => {
      if (!userSnap.exists()) return;
      const userData = userSnap.data();
      const friendIds = userData.friends || [];

      // clean previous chat listeners
      chatUnsubs.forEach((u) => u());
      chatUnsubs = [];

      const generateChatId = (a, b) => [a, b].sort().join("_");

      const friendPromises = friendIds.map(async (fid) => {
        const friendDoc = await getDoc(doc(db, "users", fid));
        if (!friendDoc.exists()) return null;
        const fData = friendDoc.data();

        const chatId = generateChatId(currentUser.uid, fid);
        const chatRef = doc(db, "chats", chatId);

        // Ensure chat doc exists for first-time conversations
        const chatSnap = await getDoc(chatRef);
        if (!chatSnap.exists()) {
          await setDoc(chatRef, {
            users: [currentUser.uid, fid],
            lastMessage: "",
            from: "",
            time: serverTimestamp(),
            pin: false,
          });
        }

        // Listen for chat updates
        const unsubChat = onSnapshot(chatRef, (chatSnap) => {
          const chatData = chatSnap.exists() ? chatSnap.data() : {};
          const lastMessage = chatData.lastMessage || "";

          // normalize time => number (ms)
          const lastMessageTimeDate = chatData.time?.toDate ? chatData.time.toDate() : null;
          const lastMessageTimeMs = lastMessageTimeDate ? lastMessageTimeDate.getTime() : null;

          const lastMessageFormatted = lastMessageTimeDate
            ? lastMessageTimeDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "";

          setFriends((prev) => {
            const updated = {
              id: fid,
              name: fData.name || "Unknown",
              avatar: fData.avatar || "",
              isOnline: fData.isOnline || false,
              lastMessage,
              lastMessageTime: lastMessageTimeMs, // number | null
              lastMessageFormatted,
              pin: chatData.pin || false,
            };

            const exists = prev.find((p) => p.id === fid);
            const newFriends = exists ? prev.map((p) => (p.id === fid ? updated : p)) : [...prev, updated];

            // cache to localStorage (numbers are safe)
            try {
              localStorage.setItem(cacheKey, JSON.stringify(newFriends));
            } catch (e) {
              console.warn("Failed to cache friends:", e);
            }

            return newFriends;
          });
        });

        chatUnsubs.push(unsubChat);
      });

      await Promise.all(friendPromises);
    });

    return () => {
      unsubUser();
      chatUnsubs.forEach((u) => u());
    };
  }, [currentUser]);

  // Sort by numeric timestamp safely (newest first)
  return friends
    .slice()
    .sort((a, b) => (b.lastMessageTime || 0) - (a.lastMessageTime || 0));
};

export default useFriendsWithLastMessage;
