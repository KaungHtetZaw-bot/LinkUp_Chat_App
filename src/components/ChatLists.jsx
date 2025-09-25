import { PinIcon } from 'lucide-react'
import React from 'react'
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
    pin: false,
  },
  {
    id: "3",
    name: "Emily Chen",
    avatar: "",
    lastMessage: "Can we reschedule our call?",
    time: "Yesterday",
    from:"Emily Chen",
    unread: 1,
    pin: false,
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
  {
    id: "5",
    name: "Sophia Lee",
    avatar: "",
    lastMessage: "I'll be there in 10 minutes.",
    time: "Sunday",
    from:"Sophia Lee",
    unread: 0,
    pin: false,
  },
  {
    id: "6",
    name: "Michael Brown",
    avatar: "",
    lastMessage: "Thanks for your help!",
    time: "Saturday",
    from:"Michael Brown",
    unread: 0,
    pin: false,
  },
  {
    id: "7",
    name: "Olivia Wilson",
    avatar: "",
    lastMessage: "Let's catch up over coffee ☕",
    time: "Friday",
    from:"Olivia Wilson",
    unread: 3,
    pin: false,
  },
  {
    id: "8",
    name: "David Kim",
    avatar: "",
    lastMessage: "Project deadline is next week 📅",
    time: "Thursday",
    from:"David Kim",
    unread: 0,
    pin: false,
  },
  {
    id: "9",
    name: "Isabella Martinez",
    avatar: "",
    lastMessage: "Happy Birthday! 🎉",
    time: "Wednesday",
    from:"Isabella Martinez",
    unread: 0,
    pin: false,
  },
  {
    id: "10",
    name: "James Garcia",
    avatar: "",
    lastMessage: "Call me when you're free.",
    time: "Tuesday",
    from:"James Garcia",
    unread: 0,
    pin: false,
  },
  {
    id: "11",
    name: "Mia Rodriguez",
    avatar: "",
    lastMessage: "Check out this article 📰",
    time: "Last week",
    from:"Mia Rodriguez",
    unread: 0,
    pin: false,
  },
  {
    id: "12",
    name: "Ethan Davis",
    avatar: "",
    lastMessage: "I'll send you the report by EOD.",
    time: "Last week",
    from:"Ethan Davis",
    unread: 0,
    pin: false, 
  },
  {
    id: "13",
    name: "Ava Wilson",
    avatar: "",
    lastMessage: "Let's plan a trip! ✈️",
    time: "Last week",
    from:"Ava Wilson",
    unread: 0,
    pin: false, 
  },
  {
    id: "14",
    name: "Liam Johnson",
    avatar: "",
    lastMessage: "Meeting at 3 PM today.",
    time: "Last week",
    from:"Liam Johnson",
    unread: 0,
    pin: false,
  }
]

const ChatLists = () => {
  return (
    <div className=''>
        <h1 className='text-2xl font-bold ml-5'>Recent</h1>
        <div className='flex flex-col gap-3 overflow-y-scroll scrollbar-custom scroll-auto h-[80vh] sm:h-[85vh] lg:h-[90vh] pb-10'>
          {
            userChats.map((chat) => (
            <div key={chat.id} className='sm:px-7 px-3 py-2 flex justify-between items-center hover:bg-[#E6EBF5] cursor-pointer'>
                <div className='flex gap-3 justify-between items-center'>
                    <div>
                        <div className="w-12 h-12 rounded-full bg-[#6960DC] flex items-center justify-center text-white font-bold">
                            {chat.name.charAt(0)}
                        </div>
                    </div>
                    <div className='leading-6'>
                        <h1 className='font-bold'>{chat.name}</h1>
                        <h3 className='truncate sm:w-[50vw] lg:w-[250px] w-[60vw]'>{chat.from} : <span>{chat.lastMessage}</span></h3>
                    </div>
                </div>
                <div className='flex flex-col items-end gap-3 text-xs'>
                <div>{chat.time}</div>
                {chat.pin && <div className='flex justify-end'><PinIcon size={12} /></div>}
                </div>
            </div>
            ))   
          }
        </div>
    </div>
  )
}

export default ChatLists