import React from 'react'
import SideBar from '../components/SideBar'
import ChatListsSection from '../components/ChatListsSection'
import ConversationSection from '../components/ConversationSection'


const HomePage = () => {
  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      <div className='hidden sm:block'>
        <SideBar />
      </div>
      <ChatListsSection />
      <div className='hidden lg:block w-full'>
        <ConversationSection />
      </div>
    </div>
  )
}

export default HomePage