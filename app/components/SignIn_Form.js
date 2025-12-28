"use client"
import { MdEmail } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
// import { loginUser } from '../../utils/auth';

import axios from "axios";

export default function SignIn() {
      const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    const handleLogin = async (e) => {
       
        e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
        username: username,
        password: password
      });
        localStorage.setItem('accessToken', response.data.accessToken);

    } catch (err) {
      console.log('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

    
    return (
        <div className="bg-[#F3F4F6] w-full h-full flex justify-center items-center">
<div className="bg-white w-[500px] h-[500px] rounded-lg shadow-lg px-10 py-7">
          <h3 className="text-4xl my-3 font-semibold">Welcome Back </h3>
          <h4 className="text-xs text-gray-500">Please enter your details to sign in</h4>
          <div className="flex justify-center items-center  mt-10">
            <div className="flex flex-col gap-7 w-[80%]">
              <form className="flex flex-col gap-6"
              onSubmit={handleLogin}>
                <div className="flex w-full px-2 rounded-md h-10 border items-center gap-3">
                    {/* <label className="text-gray-500">Email Address</label>    */}
                      <input
                  className=" w-full px-3 outline-none"
                  placeholder="Enter your email or username"
                    onChange={(e)=>setUsername(e.target.value)}
                  required
                />
                <span className="text-xl text-gray-700"><MdEmail /></span>
                </div>

            <div className="flex w-full px-2 rounded-md h-10 border items-center gap-3">
                    {/* <label className="text-gray-500">Email Address</label>    */}
                      <input
                  className=" w-full px-3 outline-none"
                  placeholder="Password"
                  type="password"
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />
                <span className="text-xl text-gray-700"><FaEyeSlash /></span>
                </div>
              <h1 className="text-blue-500 text-sm">Forgot Password?</h1>
              <hr className="h-1"></hr>
                            <button type="submit" className="bg-blue-600 text-white rounded-md h-10 ">Sign In</button>


              </form>
            </div>
          </div>
        </div>
        </div>
        
    )
}