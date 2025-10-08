import React, { useState } from "react";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      // ✅ Create account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Update profile
      await updateProfile(user, { displayName: username });

      // ✅ Create user record in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: username,
        email: user.email,
        avatar: "",
        friends:[],
        isOnline: true,
        lastSeen: serverTimestamp(),
      });

      // ✅ Redirect to homepage
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "#f5f4ff" }}
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1
          className="text-3xl font-extrabold text-center mb-4"
          style={{ color: "#6960DC" }}
        >
          Connect Your Friends 💜
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: "#6960DC" }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: "#6960DC" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: "#6960DC" }}
          />
          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold text-white hover:bg-[#5a52c7]"
            style={{ backgroundColor: "#6960DC" }}
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
