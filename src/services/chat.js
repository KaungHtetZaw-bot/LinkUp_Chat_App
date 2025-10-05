import { db } from "./firebase";
import { collection, addDoc, query, orderBy, onSnapshot, where, getDocs, doc, setDoc } from "firebase/firestore";

// Get all chats for a user
export const getUserChats = async (uid, callback) => {
  const q = query(collection(db, "chats"), where("users", "array-contains", uid), orderBy("lastTimestamp", "desc"));
  return onSnapshot(q, (snapshot) => {
    const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(chats);
  });
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
export const sendMessage = async (chatId, senderId, text) => {
  const messagesRef = collection(db, "chats", chatId, "messages");
  const timestamp = Date.now();
  await addDoc(messagesRef, { text, senderId, timestamp });

  // update last message in chat document
  const chatDocRef = doc(db, "chats", chatId);
  await setDoc(chatDocRef, { lastMessage: text, lastTimestamp: timestamp }, { merge: true });
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
