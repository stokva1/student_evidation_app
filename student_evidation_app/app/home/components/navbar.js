"use client"
import {signOut} from "next-auth/react";
import LogoutIcon from '@mui/icons-material/Logout';
import {useEffect, useState} from "react";
import getLoggedUser from "@/app/actions/getLoggedUser";

export default function Navbar() {
    const [userName, setUserName] = useState("")
    useEffect(() => {
        getUserName().catch()
    }, [])

    const getUserName = async () => {
        const user = await getLoggedUser()
        setUserName(user.firstname + " " + user.surname)
    }

    return (
        <div className="fixed w-full z-10">
            <nav className="flex items-center justify-between py-1 bg-blue-500 shadow-xl px-1">
                <div className="ml-3 text-white text-lg font-semibold leading-9 tracking-tight">
                    {userName}
                </div>
                <button className="text-white right-0 size-12 rounded-md focus:outline-none transition ease-in-out delay-50 hover:bg-white hover:text-blue-500"
                        onClick={() => signOut()}>
                    <LogoutIcon/>
                </button>
            </nav>
        </div>
    )
}