"use client"
import {signOut} from "next-auth/react";
export default function UserInfo(){
    return(
        <div className="shadow-lg p-4 bg-zinc-300/10 flex flex-col rounded-md">
            <div className="flex flex-col gap-1 pb-3 ">
                <div>
                    Name: <span className="font-bold"></span>
                </div>
                <div>
                    Email: <span className="font-bold mb-5"></span>
                </div>
            </div>
            <button className="bg-red-500 text-white font-bold py-2 rounded-md"
                    onClick={() => signOut({callbackUrl: `/`})}>
                Log Out
            </button>
        </div>
    )
}