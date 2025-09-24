import React from 'react'
import ChatLists from './ChatLists'
import SearchBar from './SearchBar'
const ChatListsSection = () => {
  return (
    <div className='bg-[#F5F7FB]'>
        <SearchBar />
        <ChatLists />
    </div>
  )
}

export default ChatListsSection