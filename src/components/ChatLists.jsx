import React from "react";
import { PinIcon } from "lucide-react";
import useFriendsWithLastMessage from "../hooks/useFriendsWithLastMessage";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { ensureChatExists } from "../utils/ensureChatExists";
import { useAuth } from "../context/AuthContext";

const ChatLists = ({ onSelectChat,searchResults = [],localLists = [] }) => {
  const friends = useFriendsWithLastMessage();
 const { currentUser } = useAuth();
 const handleSelect = async (friend) => {
    await updateDoc(doc(db, "users", currentUser.uid), {
      friends: arrayUnion(friend.id),
    });
    await updateDoc(doc(db, "users", friend.id), {
      friends: arrayUnion(currentUser.uid),
    });
    const chatId = await ensureChatExists(currentUser.uid, friend.id);
    onSelectChat(chatId, friend.name, friend.avatar, friend.id);
  };
  const listToRender = searchResults.length > 0 ? searchResults : friends;
  return (
    <div>
      <h1 className="md:text-2xl text-lg font-bold md:ml-5 ml-3">{searchResults.length > 0 ? "Search Results" : "Recent"}</h1>
      <div className="flex flex-col gap-3 overflow-y-scroll max-h-[80vh] scrollbar-custom scroll-auto pb-10">
        {listToRender.map((friend) => (
          <div
            key={friend.id}
            onClick={() => handleSelect(friend)}
            className="sm:px-7 px-3 py-2 flex justify-between items-center hover:bg-[#E6EBF5] cursor-pointer"
          >
            <div className="flex gap-3 items-center">
              <div>
                {friend.avatar ? (
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="md:w-12 md:h-12 w-8 h-8 rounded-full bg-[#6960DC] flex items-center justify-center text-white font-bold">
                    {friend.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="leading-6">
                <h1 className="font-bold opacity-70">{friend.name}</h1>
                <h3 className="truncate sm:w-[50vw] lg:w-[250px] w-[60vw] text-xs text-gray-500">
                  {
                    friend.lastMessage?(<span>{friend.lastMessage}</span>):(<span>No messages yet</span>)
                  } 
                </h3>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3 text-xs">
              <div className="text-xs text-gray-400">{friend.lastMessageFormatted || ""}</div>
              {friend.pin && (
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
