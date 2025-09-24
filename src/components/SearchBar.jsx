import { SearchIcon } from 'lucide-react'
import React from 'react'

const SearchBar = () => {
  return (
    <div className='gap-3 flex flex-col h-scree max-w-lg w-full'>
        <div className='p-5'>
            <div className='flex gap-2 p-3 items-center bg-[#E6EBF5] w-full'>
                <input type="text" className='w-full outline-none px-3' placeholder='Search...'/>
                <SearchIcon size={20}/>
            </div>
        </div>
    </div>
  )
}

export default SearchBar