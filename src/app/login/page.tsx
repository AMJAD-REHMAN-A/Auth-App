"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
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
            toast.success("Login successfuly")
            route.push("/profile")
        } catch {
            toast.error("something went wrong");
        }
    }

    useEffect(() => {
        if(user.email || user.password){
            setButtonDisabled(true)
        }else{
            setButtonDisabled(false)
        }
    }, [user])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                Login page
            </h1>
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                type="text"
                name="email"
                value={user.email}
                onChange={e => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type="password"
                name="password"
                value={user.password}
                onChange={e => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <button onClick={onLogin}>
                Login
            </button>
            <Link href="/signup">Visit Sign Up Page</Link>
        </div>
    )
}