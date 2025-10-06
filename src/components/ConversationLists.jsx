import React, { useEffect, useState, useRef } from "react";
import { collection, query, orderBy, onSnapshot, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const ConversationLists = ({ chatId }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!chatId || !currentUser) return;

    // 🔹 Firestore: Listen to all messages in the chat
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const msgs = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const msg = docSnap.data();

          // Get sender info
          let senderName = "Unknown";
          let avatar = "";

          if (msg.from) {
            const userDoc = await getDoc(doc(db, "users", msg.from));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              senderName = userData.name || msg.from;
              avatar = userData.avatar || "";
            }
          }

          // Format timestamp
          const formattedTime = msg.timestamp?.toDate
            ? msg.timestamp.toDate().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";

          return {
            id: docSnap.id,
            from: msg.from,
            message: msg.message, // Make sure Firestore field is 'message'
            timestamp: formattedTime,
            senderName,
            avatar,
          };
        })
      );

      setMessages(msgs);
      console.log("msgs",msgs)
    });

    return () => unsubscribe();
  }, [chatId, currentUser]);

  // 🔹 Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-5 h-[85vh] overflow-y-scroll scrollbar-custom scroll-auto">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`py-7 flex ${msg.from === currentUser.uid ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[60%] p-3 rounded-lg ${
              msg.from === currentUser.uid ? "bg-[#6960DC] text-white" : "bg-[#E6EBF5] text-black"
            }`}
          >
            <p>{msg.message}</p>
            <span className="text-xs opacity-70">{msg.timestamp}</span>
          </div>
        </div>
      ))}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ConversationLists;
