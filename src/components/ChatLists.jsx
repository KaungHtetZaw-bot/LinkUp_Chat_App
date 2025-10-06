import React, { useEffect, useState } from "react";
import { PinIcon } from "lucide-react";
import { db } from "../firebase";
import { collection, query, onSnapshot, getDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const ChatLists = ({onSelectChat}) => {
  const { currentUser } = useAuth();
  const [chats, setChats] = useState([]);
 
  useEffect(() => {
    if (!currentUser) return;

    const chatsRef = collection(db, "chats");
    const q = query(chatsRef);

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const chatData = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const chat = docSnap.data();

          // Format timestamp nicely
          let formattedTime = "";
          if (chat.time?.toDate) {
            const date = chat.time.toDate();
            formattedTime = date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          }

          // 🔹 Find the user who sent the message
          let fromName = "Unknown";
          if (chat.from) {
            const senderDoc = await getDoc(doc(db, "users", chat.from));
            if (senderDoc.exists()) {
              fromName = senderDoc.data().name || chat.from;
            }
          }

          // 🔹 Find the other user in the chat (not current user)
          const otherUserId = chat.users.find(
            (uid) => uid !== currentUser.uid
          );
          let otherUserName = "Unknown";
          let avatar = "";

          if (otherUserId) {
            const otherUserDoc = await getDoc(doc(db, "users", otherUserId));
            if (otherUserDoc.exists()) {
              const userData = otherUserDoc.data();
              otherUserName = userData.name || otherUserId;
              avatar = userData.avatar || "";
            }
          }

          console.log("docSnap.id",docSnap.id)

          return {
            id: docSnap.id, 
            name: otherUserName,
            avatar,
            lastMessage: chat.lastMessage || "No messages yet",
            from: fromName,
            time: formattedTime || "",
            pin: chat.pin || false,
          };
        })
      );

      setChats(chatData);
      console.log("chatData",chatData)
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div>
      <h1 className="text-2xl font-bold ml-5">Recent</h1>
      <div className="flex flex-col gap-3 overflow-y-scroll max-h-[80vh] scrollbar-custom scroll-auto pb-10">
        {chats.map((chat) => (
          <div
            key={chat.id}  onClick={() => onSelectChat(chat.id, chat.name, chat.avatar)}
            className="sm:px-7 px-3 py-2 flex justify-between items-center hover:bg-[#E6EBF5] cursor-pointer"
          >
            <div className="flex gap-3 items-center">
              <div>
                {chat.avatar ? (
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#6960DC] flex items-center justify-center text-white font-bold">
                    {chat.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="leading-6">
                <h1 className="font-bold">{chat.name}</h1>
                <h3 className="truncate sm:w-[50vw] lg:w-[250px] w-[60vw] text-xs">
                  {chat.from}: <span>{chat.lastMessage}</span>
                </h3>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3 text-xs">
              <div className="text-xs text-gray-400">{chat.time}</div>
              {chat.pin && (
                <div className="flex justify-end">
                  <PinIcon size={12} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatLists;
