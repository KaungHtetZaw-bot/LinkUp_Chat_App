import { SearchIcon } from 'lucide-react'
import React from 'react'

const SearchBar = () => {
  return (
    <div className='gap-3 p-5 flex flex-col w-full'>
      <h1 className='text-2xl font-bold'>Chats</h1>
        <div className='flex gap-2 p-3 items-center bg-[#E6EBF5] w-full'>
            <input type="text" className='w-full outline-none px-3' placeholder='Search...'/>
            <SearchIcon size={20}/>
        </div>
    </div>
  )
}
export default SearchBar