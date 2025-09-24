import './App.css'
import SideBar from './components/SideBar'
import ChatListsSection from './components/ChatListsSection'
import { Ellipsis, Paperclip, Phone, Search, SendHorizontal, Smile, UserRoundSearch, Video } from 'lucide-react'
import { sendEmailVerification } from 'firebase/auth'

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
  

function App() {
  return (
    <div className="flex">
      <SideBar />
      <ChatListsSection />
      <div className='p-5 w-full'>
        <nav className='flex justify-between sticky items-center border-b-[1px] border-gray-300 pb-3'>
          <div className='flex items-center gap-3'>
            <div className="p-2 w-10 h-10 rounded-full bg-[#6960DC] flex items-center justify-center text-white font-bold">
              {"A"}
            </div> 
            <div className='text-xl font-bold'>Alice</div> 
        </div>
        <div className='flex gap-8'>
          <Search color={"#818594"} />
          <Phone color={"#818594"}/>
          <Video color={"#818594"}/>
          <UserRoundSearch color={"#818594"}/>
          <Ellipsis color={"#818594"}/>
        </div>
        </nav>
        <div className='p-5 h-[85vh] overflow-y-scroll scrollbar-custom scroll-auto'>
            {
              chatData.map((chat) => (
                <div key={chat.id} className={`mb-5 flex ${chat.sender[0].name === 'Alice' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[60%] p-3 rounded-lg ${chat.sender[0].name === 'Alice' ? 'bg-[#6960DC] text-white' : 'bg-[#E6EBF5] text-black'}`}>
                    <p>{chat.message}</p>
                    <span className='text-xs opacity-70'>{new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              ))  
            }
        </div>
        <div className='flex gap-5 items-center sticky bg-white p-3'>
          <input type="text" placeholder="Type a message..." className='w-full p-3 outline-none bg-[#EFF2F7]'/>
          <Smile />
          <Paperclip />
          <button className='bg-[#6960DC] p-3 rounded-sm'><SendHorizontal color='#ffff' /></button>
        </div>
      </div>
    </div>
  )
}

export default App

          