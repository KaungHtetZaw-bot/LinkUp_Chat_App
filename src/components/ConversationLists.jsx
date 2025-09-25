import React from 'react'

const chatData = [
    {
      id: 1,
      sender: [{id:1,name: 'Alice', avatar: ''}],
      to: [{id:2,name: 'Bob'}],
      message: 'Hello, Bob!',
      timestamp: '2023-10-01T10:00:00Z',
    },
    {
      id: 2,
      sender: [{id:2,name: 'Bob', avatar: ''}],
      to: [{id:1,name: 'Alice'}],
      message: 'Hi, Alice! How are you?',
      timestamp: '2023-10-01T10:05:00Z',
    },
    {
      id: 3,
      sender: [{id:1,name: 'Alice', avatar: ''}],
      to: [{id:2,name: 'Bob'}],
      message: "I'm good, thanks! What about you?",
      timestamp: '2023-10-01T10:10:00Z', 
    },
    {
      id: 4,
      sender: [{id:2,name: 'Bob', avatar: ''}],
      to: [{id:1,name: 'Alice'}],
      message: "Doing well! Are you free for a call later?",
      timestamp: '2023-10-01T10:15:00Z',
    },
    {
      id: 5,
      sender: [{id:1,name: 'Alice', avatar: ''}],
      to: [{id:2,name: 'Bob'}],
      message: 'Sure, let me know the time.',
      timestamp: '2023-10-01T10:20:00Z',
    },
    {
      id: 6,
      sender: [{id:2,name: 'Bob', avatar: ''}],
      to: [{id:1,name: 'Alice'}],
      message: 'How about 3 PM?',
      timestamp: '2023-10-01T10:25:00Z',
    },
    {
      id: 7,
      sender: [{id:1,name: 'Alice', avatar: ''}],
      to: [{id:2,name: 'Bob'}],
      message: "3 PM works for me. Talk to you then!",
      timestamp: '2023-10-01T10:30:00Z',
    },
    {
      id: 8,
      sender: [{id:2,name: 'Bob', avatar: ''}],
      to: [{id:1,name: 'Alice'}],
      message: 'Great! See you later.',
      timestamp: '2023-10-01T10:35:00Z',
    },  
    {
      id: 9,
      sender: [{id:1,name: 'Alice', avatar: ''}],
      to: [{id:2,name: 'Bob'}],
      message: 'Bye!',
      timestamp: '2023-10-01T10:40:00Z',
    },
    {
      id: 10,
      sender: [{id:2,name: 'Bob', avatar: ''}],
      to: [{id:1,name: 'Alice'}],
      message: 'Take care!',
      timestamp: '2023-10-01T10:45:00Z',
    },
    {
      id: 11,
      sender: [{id:1,name: 'Alice', avatar: ''}],
      to: [{id:2,name: 'Bob'}],
      message: 'You too!',
      timestamp: '2023-10-01T10:50:00Z',
    }

]

const ConversationLists = () => {
  return (
    <div className='p-5 h-[85vh] overflow-y-scroll scrollbar-custom scroll-auto'>
        {
            chatData.map((chat) => (
            <div key={chat.id} className={`py-7 flex ${chat.sender[0].name === 'Alice' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[60%] p-3 rounded-lg ${chat.sender[0].name === 'Alice' ? 'bg-[#6960DC] text-white' : 'bg-[#E6EBF5] text-black'}`}>
                    <p>{chat.message}</p>
                    <span className='text-xs opacity-70'>{new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>
            ))  
        }
    </div>
  )
}

export default ConversationLists