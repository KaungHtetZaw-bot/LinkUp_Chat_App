import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import ChatListsSection from "../components/ChatListsSection";
import ConversationSection from "../components/ConversationSection";
import MobileFooter from "../components/MobileFooter";

const HomePage = () => {
  const [selectedChat, setSelectedChat] = useState({
    chatId: null,
    chatName: "",
    avatar: "",
    otherUserId: null,
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 780);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 780);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <div className="flex flex-1">
        <div className="hidden sm:block w-fit">
          <SideBar />
        </div>

        <div className="flex-1 flex">
          {(!selectedChat.chatId || !isMobile) && (
            <ChatListsSection
              onSelectChat={(chatId, chatName, avatar, otherUserId) =>
                setSelectedChat({ chatId, chatName, avatar, otherUserId })
              }
            />
          )}

          {(selectedChat.chatId || !isMobile) && (
            <div className="flex-1">
              {selectedChat.chatId ? (
                <ConversationSection
                  chatId={selectedChat.chatId}
                  chatName={selectedChat.chatName}
                  avatar={selectedChat.avatar}
                  otherUserId={selectedChat.otherUserId}
                  handleBack={() =>
                    setSelectedChat({
                      chatId: null,
                      chatName: "",
                      avatar: "",
                      otherUserId: null,
                    })
                  }
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Select a chat to start messaging
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer (mobile only) */}
      <div className="sm:hidden w-full">
        {
         !selectedChat.chatId&& <MobileFooter />
        }
      </div>
    </div>
  );
};

export default HomePage;
