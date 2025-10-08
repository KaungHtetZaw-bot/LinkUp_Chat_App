import React from "react";
import appLogo from "../assets/logo.svg";
import {
  Contact,
  MessageSquareMore,
  MoonStar,
  Settings,
  User,
  UserSearch,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // ✅ make sure you export auth in firebase.js
import { useNavigate } from "react-router-dom";

const SideBar = ({ closeSidebar }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // or your desired route after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="sm:p-3 p-2 w-fit h-screen flex sm:flex-col justify-between relative">
      {/* Logo Section */}
      <div className="flex flex-col gap-5 items-center">
        <img src={appLogo} alt="Linkup" className="w-13" />
      </div>

      {/* Navigation Icons */}
      <div className="flex sm:flex-col gap-5">
        <div className="p-2 cursor-pointer hover:text-[#6960DC]"><User size={30} /></div>
        <div className="p-2 cursor-pointer hover:text-[#6960DC]"><MessageSquareMore size={30} /></div>
        <div className="p-2 cursor-pointer hover:text-[#6960DC]"><UserSearch size={30} /></div>
        <div className="p-2 cursor-pointer hover:text-[#6960DC]"><Contact size={30} /></div>
        <div className="p-2 cursor-pointer hover:text-[#6960DC]"><Settings size={30} /></div>
      </div>

      {/* Bottom Section */}
      <div className="flex sm:flex-col gap-5 items-center">
        <div className="p-2 cursor-pointer hover:text-[#6960DC]"><MoonStar size={30} /></div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="p-2 text-red-500 hover:text-red-600 transition"
          title="Logout"
        >
          <LogOut size={28} />
        </button>

        {/* Profile */}
        {currentUser?.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt={currentUser.displayName}
            className="p-2 w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="p-2 w-10 h-10 rounded-full bg-[#6960DC] flex items-center justify-center text-white font-bold">
            {currentUser?.displayName?.charAt(0) || "U"}
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
