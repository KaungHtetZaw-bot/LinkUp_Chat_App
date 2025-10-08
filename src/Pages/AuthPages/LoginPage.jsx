import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // your firebase config
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const brandPurple = "#6960DC";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Optional: you can log or use currentUser here
      navigate("/"); // redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

  // If user is already logged in, redirect automatically
  if (currentUser) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#f5f4ff" }}>
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-2" style={{ color: brandPurple }}>
          Connect Your Friends
        </h1>
        <h2 className="text-lg text-gray-600 text-center mb-6">
          Log in to start chatting with your friends
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
              style={{ borderColor: brandPurple, outlineColor: brandPurple }}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
              style={{ borderColor: brandPurple, outlineColor: brandPurple }}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold text-white shadow-md focus:outline-none focus:ring-2"
            style={{ backgroundColor: brandPurple }}
          >
            Log In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="font-medium" style={{ color: brandPurple }}>
            Register
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
