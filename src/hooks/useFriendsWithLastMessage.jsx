// src/hooks/useFriendsWithLastMessage.js
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const useFriendsWithLastMessage = () => {
  const { currentUser } = useAuth();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (!currentUser?.uid) return;

    const userRef = doc(db, "users", currentUser.uid);
    let chatUnsubs = [];

    const unsubUser = onSnapshot(userRef, async (userSnap) => {
      if (!userSnap.exists()) return;
      const userData = userSnap.data();
      const friendIds = userData.friends || [];

      // Clean up previous listeners
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

        // Listen to chat updates
        const unsubChat = onSnapshot(chatRef, (chatSnap) => {
          const chatData = chatSnap.exists() ? chatSnap.data() : {};
          const lastMessage = chatData.lastMessage || "";
          const lastMessageTime = chatData.time?.toDate
            ? chatData.time.toDate()
            : null;
          const lastMessageFormatted = lastMessageTime
            ? lastMessageTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";

          setFriends((prev) => {
            const updated = {
              id: fid,
              name: fData.name || "Unknown",
              avatar: fData.avatar || "",
              isOnline: fData.isOnline || false,
              lastMessage,
              lastMessageTime,
              lastMessageFormatted,
            };
            const exists = prev.find((f) => f.id === fid);
            if (exists) {
              return prev.map((f) => (f.id === fid ? updated : f));
            } else {
              return [...prev, updated];
            }
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

  // Sort friends by last message timestamp (newest first)
  return friends
    .slice()
    .sort((a, b) => (b.lastMessageTime?.getTime() || 0) - (a.lastMessageTime?.getTime() || 0));
};

export default useFriendsWithLastMessage;
