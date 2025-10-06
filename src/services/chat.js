import { db } from "./firebase";
import { collection, addDoc, query, orderBy, onSnapshot, where, getDocs, doc, setDoc } from "firebase/firestore";

// Get all chats for a user
export const getUserChats = (uid, callback) => {
  const chatsRef = collection(db, "chats");
  const unsubscribe = onSnapshot(chatsRef, async (snapshot) => {
    const chats = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const chat = docSnap.data();
        if (!chat.users.includes(uid)) return null;

        const otherUserId = chat.users.find(id => id !== uid);
        let otherUserName = "Unknown";
        let avatar = "";

        if (otherUserId) {
          const userDoc = await getDoc(doc(db, "users", otherUserId));
          if (userDoc.exists()) {
            otherUserName = userDoc.data().name || otherUserId;
            avatar = userDoc.data().avatar || "";
          }
        }

        return {
          id: docSnap.id,
          name: otherUserName,
          avatar,
          lastMessage: chat.lastMessage || "No messages yet",
          from: chat.from || "Unknown",
          time: chat.time?.toDate
            ? chat.time.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "",
          pin: chat.pin || false,
        };
      })
    );

    callback(chats.filter(Boolean));
  });

  return unsubscribe;
};


// Create a new chat (if not exists)
export const createChat = async (uids) => {
  const chatRef = doc(collection(db, "chats"));
  await setDoc(chatRef, {
    users: uids,
    lastMessage: "",
    lastTimestamp: Date.now(),
  });
  return chatRef.id;
};

// Send message
export const sendMessage = async (chatId, from, message) => {
  const messagesRef = collection(db, "chats", chatId, "messages");
  const timestamp = Date.now();
  await addDoc(messagesRef, { message, from, timestamp });

  // update last message in chat document
  const chatDocRef = doc(db, "chats", chatId);
  await setDoc(chatDocRef, { lastMessage: message, lastTimestamp: timestamp }, { merge: true });
};

// Subscribe to messages
export const subscribeToMessages = (chatId, callback) => {
  const messagesRef = collection(db, "chats", chatId, "messages");
  const q = query(messagesRef, orderBy("timestamp", "asc"));
  return onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(msgs);
  });
};
