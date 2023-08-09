"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import  toast, { Toaster } from "react-hot-toast";
export default function LoginPage() {
  const route = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    try {
      const data = await axios.post("/api/users/login", user);
      console.log(data);
      if(data.data.error){
        throw new Error("Login error");
      }
      toast.success("Login successfuly")
      route.push("/profile")
    } catch {
      toast.error("something went wrong");
    }
  }

  useEffect(() => {
    if (user.email || user.password) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
  }, [user])


  return (
    <div className="flex flex-col bg-white shadow-md rounded-md p-8 w-1/3">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Login page
      </h1>
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="text"
        name="email"
        value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        name="password"
        value={user.password}
        onChange={e => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button onClick={onLogin} className="rounded-md p-2 outline-none bg-black text-white">
        Login
      </button>
      <Link href="/signup"className="text-center mt-2 text-gray-400">Visit <span className="text-blue-300"> Sign Up Page </span></Link>
      <Toaster />
    </div>
  )
}