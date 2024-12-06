import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username: "admin",
        password: "password123",
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username); // Store username for later use
            toast.success("Login successful!");
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
           toast.error("Login failed! Please check your credentials.");
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google Login Clicked!");
    
  };

  const handleAppleLogin = () => {
    toast.info("Apple Login Clicked!");
    
  };

  const handleSignup = () => {
    toast.info("Signup with Email Clicked!");
    
  };

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen p-4">
       <ToastContainer />
      <div className="bg-base-100 p-6 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-primary text-center mb-6">
          Welcome Back
        </h1>

        <form className="space-y-4">
          
          <div>
            <label htmlFor="username" className="block text-secondary mb-2">
              Username or Email
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          
          <div>
            <label htmlFor="password" className="block text-secondary mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          
          <button
            type="button"
            onClick={handleLogin}
            className="btn btn-primary w-full"
          >
            Login
          </button>
        </form>

        
        <div className="divider text-secondary my-4">Or</div>

        
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline btn-accent w-full flex items-center justify-center gap-2"
          >
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-6 h-6"
            >
              <path
                fill="#FFC107"
                d="M43.61 20.083H42V20H24v8h11.313C33.797 32.477 29.465 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.066 0 5.863 1.154 8.007 3.032L37.657 8.88C34.042 5.534 29.27 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20c10.486 0 18.914-7.743 19.838-17.68.09-.78.137-1.576.137-2.387 0-1.069-.095-2.11-.365-3.15z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306 14.691l6.564 4.81C15.106 15.018 19.25 13 24 13c3.066 0 5.863 1.154 8.007 3.032L37.657 8.88C34.042 5.534 29.27 4 24 4c-6.775 0-12.793 2.797-17.087 7.305l.003.002z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24 44c5.297 0 10.098-1.872 13.879-4.951l-6.517-5.364C29.614 35.587 26.933 36 24 36c-5.38 0-9.875-3.5-11.682-8.354l-6.613 5.122C10.337 39.308 16.779 44 24 44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.61 20.083H42V20H24v8h11.313c-1.448 3.787-5.108 6.5-9.313 6.5-3.103 0-5.863-1.154-8.007-3.032l-6.564 4.81C15.106 39.982 19.25 44 24 44c6.303 0 11.638-3.286 14.761-8.161.472-.74.894-1.514 1.263-2.31.123-.286.238-.575.344-.867C41.954 32.477 43.61 27.707 43.61 20.083z"
              ></path>
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={handleAppleLogin}
            className="btn btn-outline btn-neutral w-full flex items-center justify-center gap-2"
          >
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M16.365 1.43c0 1.17-.48 2.188-1.28 3.02-.967.98-2.214 1.63-3.534 1.51-.02-1.12.52-2.2 1.33-3 1-.96 2.32-1.6 3.51-1.53.02 0 .02 0 0 0-.01 0-.02 0-.02 0zm.05 6.75c.96-.01 2.66 1.42 3.56 3.04-1.47.79-2.55 2.14-3.56 2.09-.97-.02-2.36-1.03-3.46-1.03-1.09.01-2.25 1-3.47 1.03-.96.03-2.05-1.04-3.53-2.08.53-1.56 2.06-3.06 3.63-3.07.9-.02 1.79.47 2.41.47.64-.01 1.58-.49 2.43-.47z"></path>
            </svg>
            Continue with Apple
          </button>
          <button
            type="button"
            onClick={handleSignup}
            className="btn btn-secondary w-full"
          >
            Sign up with Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
