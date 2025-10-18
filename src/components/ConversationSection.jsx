import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ConversationLists from "./ConversationLists";
import InputBar from "./InputBar";

const ConversationSection = ({ chatId, chatName, avatar,otherUserId, handleBack }) => {
const [localMessages, setLocalMessages] = useState([]);
  return (
    <div className="md:px-5 md:py-2 p-2 w-full h-screen flex flex-col">
      <NavBar chatName={chatName} avatar={avatar} handleBack={handleBack} className="flex-start" />
      <div className="flex-1 overflow-y-scroll">
        <ConversationLists chatId={chatId} otherUserId={otherUserId} localMessages={localMessages} />
      </div>
      <InputBar chatId={chatId} otherUserId={otherUserId} addLocalMessage={(msgOrUpdater) =>
          setLocalMessages((prev) =>
            typeof msgOrUpdater === "function"
              ? msgOrUpdater(prev)
              : [...prev, msgOrUpdater]
          )
        } className="flex-end" />
    </div>
  );
};

export default ConversationSection;
