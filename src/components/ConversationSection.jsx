import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ConversationLists from "./ConversationLists";
import InputBar from "./InputBar";

const ConversationSection = ({ chatId, chatName, avatar, otherUserId, handleBack }) => {
  const [directMessage,setDirectMessage]=useState('')
  useEffect(() => {
    console.log("conversation", otherUserId);
  }, [chatId]);

  return (
    <div className="px-5 py-2 w-full h-screen flex flex-col">
      {window.innerWidth < 640 && handleBack && (
        <button className="p-2 mb-2 bg-gray-100 rounded" onClick={handleBack}>
          ← Back
        </button>
      )}
      <NavBar chatName={chatName} avatar={avatar} className="flex-start" />
      <div className="flex-1 overflow-y-scroll">
        <ConversationLists chatId={chatId} otherUserId={otherUserId} fsMessage={directMessage} />
      </div>
      <InputBar chatId={chatId} otherUserId={otherUserId} onMessage={setDirectMessage} className="flex-end" />
    </div>
  );
};

export default ConversationSection;
