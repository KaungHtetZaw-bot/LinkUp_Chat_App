import { Ellipsis, Phone, Search, UserRoundSearch, Video } from 'lucide-react'
import React from 'react'

const NavBar = ({chatName,avatar}) => {
  return (
    <nav className='flex justify-between sticky items-center border-b-[1px] border-gray-300 pb-3'>
        <div className='flex items-center gap-3'>
             {avatar ? (
          <img
            src={avatar}
            alt={chatName}
            className="p-2 w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="p-2 w-10 h-10 rounded-full bg-[#6960DC] flex items-center justify-center text-white font-bold">
            {chatName.charAt(0)}
          </div>
        )}
            <div className='text-xl font-bold'>{chatName}</div> 
        </div>
        <div className='flex gap-8'>
            <Search color={"#818594"} />
            <Phone color={"#818594"}/>
            <Video color={"#818594"}/>
            <UserRoundSearch color={"#818594"}/>
            <Ellipsis color={"#818594"}/>
        </div>
    </nav>
  )
}

export default NavBar