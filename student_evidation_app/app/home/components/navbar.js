"use client"
import {signOut} from "next-auth/react";

export default function Navbar() {
    function showMenu() {
        let x = document.getElementById("menu")
        if (x.style.display === "none") {
            x.style.display = "block"
        } else {
            x.style.display = "none"
        }
    }

    return (
        <div className="fixed w-full z-10">
            <nav className="shadow-md bg-white">
                <div className="mx-auto">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center ml-1">
                            <button type="button"
                                    className="relative inline-flex items-center justify-center rounded-sm p-2 text-black focus:outline-none transition ease-in-out delay-50 hover:bg-gray-200 hover:text-fim"
                                    onClick={showMenu}>
                                <svg className="block h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                     stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                                </svg>
                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                     stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div id="menu" className="hidden h-screen border-2">
                <div className="float-left w-1/6 h-screen bg-white">
                    <div className="divide-y">
                        <button className="w-full h-16 bg-white block rounded-sm px-3 py-2 text-lg font-semibold text-left text-base text-black focus:outline-none transition ease-in-out delay-50 hover:font-bold hover:text-fim hover:shadow-inner hover:border-3 shadow-lg">Účast</button>
                        <button className="w-full h-16 bg-white block rounded-sm px-3 py-2 text-lg font-semibold text-left text-base text-black focus:outline-none transition ease-in-out delay-50 hover:font-bold hover:text-fim hover:shadow-inner hover:border-3">Statistiky</button>
                        <button className="w-full h-16 bg-white block rounded-sm px-3 py-2 text-lg font-semibold text-left text-base text-black focus:outline-none transition ease-in-out delay-50 hover:font-bold hover:text-fim hover:shadow-inner hover:border-3">Účet</button>
                        <button onClick={() => signOut()} className="w-full h-16 bg-white block rounded-sm px-3 py-2 text-lg font-semibold text-left text-base text-black focus:outline-none transition ease-in-out delay-50 hover:font-bold hover:text-fim hover:shadow-inner hover:border-3m">Nastavení</button>
                    </div>
                </div>
                <div className="size-full bg-gray-800/20" onClick={showMenu}></div>
            </div>
        </div>
    )
}