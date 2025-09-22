import React from "react";
import { MessagesSquareIcon, TextAlignJustifyIcon } from 'lucide-react'
const SideBar = () => {
  return (
    <div className='p-3 bg-black w-fit h-screen '>
      <div className="p-2 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {"U"}
              </div>
        <div className='p-2'><TextAlignJustifyIcon size={38} /></div>
        <div className='p-2'><MessagesSquareIcon size={38} /></div>
      </div>
  );
}
export default SideBar;
