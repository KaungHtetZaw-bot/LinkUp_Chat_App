import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import ChatListsSection from "../components/ChatListsSection";
import ConversationSection from "../components/ConversationSection";

const HomePage = () => {
  const [selectedChat, setSelectedChat] = useState({
    chatId: null,
    chatName: "",
    avatar: "",
    otherUserId: null,
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [showSidebar, setShowSidebar] = useState(false); // for mobile sidebar

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      {(!isMobile || showSidebar) && (
        <div className={`absolute sm:relative z-20 ${isMobile ? "w-60 bg-white h-full shadow-lg" : "w-fit"}`}>
          <SideBar closeSidebar={() => setShowSidebar(false)} />
        </div>
      )}

      {/* Chat List */}
      {(!selectedChat.chatId || !isMobile) && (
        <ChatListsSection
          onSelectChat={(chatId, chatName, avatar, otherUserId) =>
            setSelectedChat({ chatId, chatName, avatar, otherUserId })
          }
        />
      )}

      {/* Conversation Section */}
      {(selectedChat.chatId || !isMobile) && (
        <div className={`flex-1 h-full ${isMobile ? "w-full relative" : "hidden lg:block"}`}>
          {selectedChat.chatId ? (
            <ConversationSection
              chatId={selectedChat.chatId}
              chatName={selectedChat.chatName}
              avatar={selectedChat.avatar}
              otherUserId={selectedChat.otherUserId}
              handleBack={() => setSelectedChat({ chatId: null, chatName: "", avatar: "", otherUserId: null })}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a chat to start messaging
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
