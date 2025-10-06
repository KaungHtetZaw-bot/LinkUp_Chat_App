import React, { useEffect } from 'react'
import NavBar from './NavBar'
import ConversationLists from './ConversationLists'
import InputBar from './InputBar'

const ConversationSection = ({ chatId, chatName, avatar, otherUserId }) => {
  useEffect(()=>{
   console.log("conversation",chatName)
  },[chatId])
  return (
    <div className='p-5 w-full'>
        <NavBar chatName={chatName} avatar={avatar} />
        <ConversationLists chatId={chatId} />
        <InputBar chatId={chatId} otherUserId={otherUserId} />
    </div>
  )
}

export default ConversationSection