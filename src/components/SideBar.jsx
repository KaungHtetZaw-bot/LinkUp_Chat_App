import React from "react";
import appLogo from "../assets/logo.svg";
import { Contact, MessageSquareMore, MoonStar, Settings, User, UserSearch } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SideBar = ({ closeSidebar }) => {
  const { currentUser } = useAuth();

  return (
    <div className="sm:p-3 p-2 w-fit h-screen flex sm:flex-col justify-between">
      <div className="flex flex-col gap-5 items-center">
        <img src={appLogo} alt="Linkup" className="w-13" />
      </div>

      <div className="flex sm:flex-col gap-5">
        <div className="p-2"><User size={30} /></div>
        <div className="p-2"><MessageSquareMore size={30} /></div>
        <div className="p-2"><UserSearch size={30} /></div>
        <div className="p-2"><Contact size={30} /> </div>
        <div className="p-2"><Settings size={30} /></div>
      </div>

      <div className="flex sm:flex-col gap-5 items-center">
        <div className="p-2"><MoonStar size={30} /></div>
        {currentUser.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt={currentUser.displayName}
            className="p-2 w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="p-2 w-10 h-10 rounded-full bg-[#6960DC] flex items-center justify-center text-white font-bold">
            {currentUser.displayName.charAt(0)}
          </div>
        )}
      </div>

      {/* Close button for mobile */}
      {closeSidebar && (
        <button
          onClick={closeSidebar}
          className="absolute top-2 right-2 sm:hidden p-2 bg-gray-200 rounded"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SideBar;
