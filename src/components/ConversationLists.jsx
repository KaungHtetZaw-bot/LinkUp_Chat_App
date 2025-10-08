import React, { useEffect, useState, useRef } from "react";
import { collection, query, orderBy, onSnapshot, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const ConversationLists = ({ chatId, localMessages = [] }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!chatId || !currentUser) return;

    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const msgs = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const msg = docSnap.data();

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
          const time = msg.timestamp?.toDate ? msg.timestamp.toDate() : new Date();

          return {
            id: docSnap.id,
            from: msg.from,
            message: msg.message,
            timestamp: time,
            senderName,
            avatar,
          };
        })
      );

      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatId, currentUser]);
  const combinedMessages = [
    ...messages,
    ...localMessages.filter((lm) => {
      const isDuplicate = messages.some((fm) => {
        if (fm.from !== lm.from || fm.message !== lm.message) return false;

        const ft = fm.timestamp instanceof Date ? fm.timestamp.getTime() : new Date(fm.timestamp).getTime();
        const lt = lm.timestamp instanceof Date ? lm.timestamp.getTime() : new Date(lm.timestamp).getTime();

        return Math.abs(ft - lt) < 5000;
      });

      return !isDuplicate;
    }),
  ].sort((a, b) => a.timestamp - b.timestamp);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [combinedMessages]);

  return (
    <div className="md:p-5 md:h-[85vh] h-[565px] overflow-y-scroll scrollbar-custom scroll-auto">
      {combinedMessages.map((msg) => {
        const timeStr =
          msg.timestamp instanceof Date
            ? msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "Sending...";

        return (
          <div
            key={msg.id || msg.localId}
            className={`md:py-7 py-2 flex ${msg.from === currentUser.uid ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[60%] p-3 rounded-lg ${
                msg.from === currentUser.uid ? "bg-[#6960DC] text-white" : "bg-[#E6EBF5] text-black"
              }`}
            >
              <p className="md:text-md text-sm">{msg.message}</p>
              <span className="text-xs opacity-70 text-[10px]">{timeStr}</span>
            </div>
            {msg.error && (
              <span className="text-xs text-red-400 mt-1 block">!!Failed to send</span>
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ConversationLists;
