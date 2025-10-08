import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import { db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'

const SearchBar = ({ searchTerm, setSearchTerm, setSearchResults }) => {
  const { currentUser } = useAuth()

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    const usersRef = collection(db, 'users')
    const q = query(
      usersRef,
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff')
    )
    const snapshot = await getDocs(q)

    const users = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((user) => user.id !== currentUser.uid)
    console.log("search",users)
    setSearchResults(users)
  }
  return (
    <div className='gap-3 p-5 flex flex-col w-full'>
      <h1 className='text-2xl font-bold'>Chats</h1>
        <form
        onSubmit={handleSearch}
        className='flex gap-2 p-3 items-center bg-[#E6EBF5] w-full'
      >
        <input
          type='text'
          className='w-full outline-none px-3'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type='submit'>
          <SearchIcon size={20} />
        </button>
      </form>
    </div>
  )
}
export default SearchBar