import React, { useState } from 'react'
import ChatLists from './ChatLists'
import SearchBar from './SearchBar'
const ChatListsSection = ({onSelectChat}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className='bg-[#F5F7FB] lg:w-[40vw] w-full h-full'>
        <SearchBar searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}/>
        <ChatLists onSelectChat={onSelectChat} searchResults={searchResults} />
    </div>
  )
}
export default ChatListsSection 