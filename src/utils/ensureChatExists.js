// src/utils/ensureChatExists.js
import { db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export const generateChatId = (uidA, uidB) => [uidA, uidB].sort().join("_");

export const ensureChatExists = async (uidA, uidB) => {
  if (!uidA || !uidB) return null;

  const chatId = generateChatId(uidA, uidB);
  const chatRef = doc(db, "chats", chatId);
  const chatSnap = await getDoc(chatRef);

  // Create chat if it doesn't exist
  if (!chatSnap.exists()) {
    await setDoc(chatRef, {
      users: [uidA, uidB],
      lastMessage: "",
      from: "",
      time: serverTimestamp(),
      pin: false,
    });
    console.log("✅ Created new chat:", chatId);
  } else {
    console.log("💬 Chat already exists:", chatId);
  }

  return chatId;
};
