"use client"
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
    const route = useRouter();
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
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl">Profile Page</h1>
            <button onClick={onLogout}>Log Out</button>
            <Toaster />
        </div>
    )
}