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
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const MobileFooter = ({ closeSidebar }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md sm:hidden flex justify-between items-center px-4 py-2 z-50">
      {/* Center nav icons */}
 
        <User size={24} className="cursor-pointer hover:text-[#6960DC]" />
        <MessageSquareMore size={24} className="cursor-pointer hover:text-[#6960DC]" />
        <UserSearch size={24} className="cursor-pointer hover:text-[#6960DC]" />
        {/* <Contact size={24} className="cursor-pointer hover:text-[#6960DC]" /> */}
        <Settings size={24} className="cursor-pointer hover:text-[#6960DC]" />
        <button
          onClick={handleLogout}
          title="Logout"
          className="text-red-500 hover:text-red-600 transition"
        >
          <LogOut size={22} />
        </button>
        {currentUser?.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt={currentUser.displayName}
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#6960DC] flex items-center justify-center text-white font-bold">
            {currentUser?.displayName?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
    </div>
  );
};

export default MobileFooter;
