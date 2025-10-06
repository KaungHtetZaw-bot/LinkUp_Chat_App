import { Paperclip, SendHorizontal, Smile } from 'lucide-react'
import React, { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, doc, setDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'

const InputBar = ({ chatId }) => {
  const { currentUser } = useAuth()
  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    if (!message.trim() || !chatId) return;

    const messagesRef = collection(db, "chats", chatId, "messages")
    const timestamp = new Date()

    await addDoc(messagesRef, {
      message,
      from: currentUser.uid,
      timestamp
    })

    const chatDocRef = doc(db, "chats", chatId)
    await setDoc(chatDocRef, { lastMessage: message, time: timestamp }, { merge: true })

    setMessage("")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage()
  }

  return (
    <div className='flex gap-5 items-center sticky bg-white p-3'>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className='w-full p-3 outline-none bg-[#EFF2F7]'
        />
        <Smile />
        <Paperclip />
        <button className='bg-[#6960DC] p-3 rounded-sm' onClick={sendMessage}>
          <SendHorizontal color='#ffff' />
        </button>
    </div>
  )
}

export default InputBar
