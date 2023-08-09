"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
export default function SignUpPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSignUp = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      router.push("/login")
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    if (user.email.length && user.password.length && user.username.length) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true)
    }
  }, [user])
  return (
    <div className="flex flex-col bg-white shadow-md rounded-md p-8 w-1/3">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Sign Up page
      </h1>
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        name="username"
        value={user.username}
        onChange={e => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
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
      <button onClick={onSignUp} disabled={buttonDisabled} className="rounded-md p-2 outline-none bg-black text-white">
        Sign Up
      </button>
      <Link href="/login" className="text-center mt-2 text-gray-400">Visit <span className="text-blue-300">Login Page</span></Link>
    </div>
  )
}