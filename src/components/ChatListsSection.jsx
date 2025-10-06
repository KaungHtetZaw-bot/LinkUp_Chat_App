import React from 'react'
import ChatLists from './ChatLists'
import SearchBar from './SearchBar'
const ChatListsSection = ({onSelectChat}) => {
  
  return (
    <div className='bg-[#F5F7FB] lg:w-[40vw] w-full h-full'>
        <SearchBar />
        <ChatLists onSelectChat={onSelectChat} />
    </div>
  )
}
export default ChatListsSection 