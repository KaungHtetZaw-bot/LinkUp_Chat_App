import React, { useState } from 'react'
import ChatLists from './ChatLists'
import SearchBar from './SearchBar'
const ChatListsSection = ({onSelectChat}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [localLists, setLocalLists] = useState([]);
  return (
    <div className='bg-[#F5F7FB] md:w-[30vw] lg:w-[20vw] w-full h-full'>
        <SearchBar searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
        addLocalLists={(msgOrUpdater) =>
          setLocalLists((prev) =>
            typeof msgOrUpdater === "function"
              ? msgOrUpdater(prev)
              : [...prev, msgOrUpdater]
          )
        }/>
        <ChatLists onSelectChat={onSelectChat} searchResults={searchResults} localLists={localLists} />
    </div>
  )
}
export default ChatListsSection 