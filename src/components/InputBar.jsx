import { Paperclip, SendHorizontal, Smile } from 'lucide-react'
import React from 'react'

const InputBar = () => {
  return (
    <div className='flex gap-5 items-center sticky bg-white p-3'>
        <input type="text" placeholder="Type a message..." className='w-full p-3 outline-none bg-[#EFF2F7]'/>
            <Smile />
            <Paperclip />
        <button className='bg-[#6960DC] p-3 rounded-sm'><SendHorizontal color='#ffff' /></button>
    </div>
  )
}

export default InputBar