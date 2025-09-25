import React from "react";
import appLogo from '../assets/logo.svg'
import {  Contact, MessageSquareMore,  MoonStar, Settings,  User, UserSearch } from 'lucide-react'
const SideBar = () => {
  return (
    <div className='sm:p-5 p-2 w-fit sm:h-screen flex sm:flex-col justify-between'>
      <div className="flex flex-col gap-5 items-center ">
        <img src={appLogo} alt="Linkup" className="w-13"/>
      </div>
      <div className="flex sm:flex-col gap-5">
        <div className='p-2'><User size={30}/></div>
        <div className='p-2'><MessageSquareMore size={30} /></div>
        <div className='p-2'><UserSearch size={30} /></div>
        <div className='p-2'><Contact size={30}/> </div>
        <div className='p-2'><Settings size={30} /></div>
      </div>
      <div className="flex sm:flex-col gap-5 items-center">
        <div className='p-2'><MoonStar size={30} /></div>
      {/* <CircleUser /> */}
      <div className="p-2 w-8 h-8 rounded-full bg-[#6960DC] flex items-center justify-center text-white font-bold">
        {"U"}
      </div>
      </div>
      </div>
  );
}
export default SideBar;
