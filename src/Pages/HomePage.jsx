import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import ChatListsSection from '../components/ChatListsSection'
import ConversationSection from '../components/ConversationSection'


const HomePage = () => {
  const [activeChatId, setActiveChatId] = useState(null);
  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      <div className='hidden sm:block'>
        <SideBar />
      </div>
      <ChatListsSection onSelectChat={setActiveChatId} />
      <div className='hidden lg:block w-full'>
        <ConversationSection chatId={activeChatId} />
      </div>
    </div>
  )
}

export default HomePage