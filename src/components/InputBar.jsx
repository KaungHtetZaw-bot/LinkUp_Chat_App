import { Paperclip, SendHorizontal, Smile } from "lucide-react";
import React, { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const InputBar = ({ chatId, otherUserId }) => {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim() || !chatId || !currentUser?.uid) return;

    try {
      const messagesRef = collection(db, "chats", chatId, "messages");

      // Add new message
      await addDoc(messagesRef, {
        message,
        from: currentUser.uid,
        timestamp: serverTimestamp(),
      });

      // Ensure chat doc exists
      const chatDocRef = doc(db, "chats", chatId);
      const chatSnap = await getDoc(chatDocRef);

      if (!chatSnap.exists()) {
        await setDoc(chatDocRef, {
          users: [currentUser.uid, otherUserId],
          pin: false,
          createdAt: serverTimestamp(),
        });
      }

      // Update last message (for chat list display)
      await setDoc(
        chatDocRef,
        {
          lastMessage: message,
          from: currentUser.uid,
          time: serverTimestamp(),
        },
        { merge: true }
      );

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex items-center gap-4 bg-white border-t border-gray-200 md:px-4 md:py-3 px-2 py-1">
      <Smile className="cursor-pointer text-gray-500" />
      <Paperclip className="cursor-pointer text-gray-500" />

      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        className="flex-1 bg-[#EFF2F7] rounded-lg md:p-3 p-2 outline-none text-sm"
      />

      <button
        onClick={sendMessage}
        className="bg-[#6960DC] hover:bg-[#5a52c7] md:p-3 p-2 rounded-lg transition-all"
      >
        <SendHorizontal color="#fff" className="w-5 h-5"/>
      </button>
    </div>
  );
};

export default InputBar;
