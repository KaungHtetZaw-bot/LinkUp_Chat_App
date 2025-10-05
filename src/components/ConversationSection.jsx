import React from 'react'
import NavBar from './NavBar'
import ConversationLists from './ConversationLists'
import InputBar from './InputBar'

const ConversationSection = ({chatId}) => {
  return (
    <div className='p-5 w-full'>
        <NavBar />
        <ConversationLists />
        <InputBar />
    </div>
  )
}

export default ConversationSection