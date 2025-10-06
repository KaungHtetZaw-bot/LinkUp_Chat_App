import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import ChatListsSection from '../components/ChatListsSection'
import ConversationSection from '../components/ConversationSection'


const HomePage = () => {
  const [selectedChat, setSelectedChat] = useState({
    chatId: null,
    chatName: "",
    avatar: "",
  });
  useEffect(()=>{
       console.log(selectedChat)
  },[selectedChat])
  return (
    <div className='flex h-screen w-screen'>
      <div className='hidden sm:block'>
        <SideBar />
      </div>
      <ChatListsSection onSelectChat={(chatId, chatName, avatar) =>
            setSelectedChat({ chatId, chatName, avatar })
          } />
     <div className='hidden lg:block w-full'>
        {selectedChat.chatId ? (
          <ConversationSection
            chatId={selectedChat.chatId}
            chatName={selectedChat.chatName}
            avatar={selectedChat.avatar}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage