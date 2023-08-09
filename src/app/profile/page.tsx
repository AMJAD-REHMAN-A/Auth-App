"use client"
import { useRouter } from "next/navigation";
import React, {useState} from "react";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
    const route = useRouter();
    const [data, setData] = useState("nothing")
    const onLogout = async () => {
        try {
            const data = await axios.get("/api/users/logout");
            console.log(data);
            toast.success("Loged out successfuly")
            route.push("/login")
        } catch {
            toast.error("something went wrong");
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data.username)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl">Profile Page</h1>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
            <button onClick={onLogout}>Log Out</button>
            <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>
           
            <Toaster />
        </div>
    )
}