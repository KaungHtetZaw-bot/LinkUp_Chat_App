
import { PinIcon, SearchIcon } from 'lucide-react'
import './App.css'
import SideBar from './components/SideBar'

export const userChats = [
  {
    id: "1",
    name: "Alice Tanaka",
    avatar: "",
    lastMessage: "Hey, are you coming to the meeting?",
    time: "10:24 AM",
    from:"Alice Tanaka",
    unread: 2,
    pin: true,
  },
  {
    id: "2",
    name: "Hiroshi Sato",
    avatar: "",
    lastMessage: "Yes, I sent you the files 📂",
    time: "09:10 AM",
    from:"Hiroshi Sato",
    unread: 0,
    pin: true,
  },
  {
    id: "3",
    name: "Emily Chen",
    avatar: "",
    lastMessage: "Can we reschedule our call?",
    time: "Yesterday",
    from:"Emily Chen",
    unread: 1,
    pin: true,
  },
  {
    id: "4",
    name: "John smith",
    avatar: "",
    lastMessage: "Sounds good 👍",
    time: "Monday",
    from:"John smith",
    unread: 0,
    pin: true,
  },
]

function App() {
  

  return (
    <div className="flex">
      <SideBar />
      <div className='gap-3 flex flex-col p-5 border-b border-gray-300 h-screen bg-gray-800 w-1/3'>
        <div className='flex gap-2 p-2 border items-center border-gray-700 rounded-lg w-full'>
          <input type="text" className='w-full outline-none px-3'/>
          <SearchIcon size={20}/>
        </div>
        <div className='flex flex-col gap-3 overflow-y-scroll scroll-auto h-[92vh]'>
          {
            userChats.map((chat) => (
                  <div key={chat.id} className='p-2 shadow-gray-700 shadow-sm flex justify-between items-center rounded-2xl '>
            <div className='flex gap-3 justify-between items-center'>
              <div>
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {chat.name.charAt(0)}
              </div>
            </div>
            <div className='leading-6'>
               <h1 className='font-bold'>{chat.name}</h1>
               <h3>{chat.from} : <span>{chat.lastMessage}</span></h3>
            </div>
            </div>
            <div className='flex flex-col items-end gap-3'>
               <div>{chat.time}</div>
               {chat.pin && <div className='flex justify-end'><PinIcon size={16} /></div>}
            </div>
          </div>
            ))   
          }
        </div>
      </div>
    </div>
  )
}

export default App

          