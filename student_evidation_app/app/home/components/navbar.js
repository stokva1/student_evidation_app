"use client"
import {signOut} from "next-auth/react";
import LogoutIcon from '@mui/icons-material/Logout';

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
            <nav className="flex items-center justify-end py-1 bg-fim shadow-xl">
                {/*<button type="button"*/}
                {/*        className="ml-1 relative rounded-sm p-2 text-black focus:outline-none transition ease-in-out delay-50 hover:bg-gray-200 hover:text-fim lg:hidden"*/}
                {/*        onClick={showMenu}>*/}
                {/*    <svg className="block h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"*/}
                {/*         stroke="currentColor" aria-hidden="true">*/}
                {/*        <path strokeLinecap="round" strokeLinejoin="round"*/}
                {/*              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>*/}
                {/*    </svg>*/}
                {/*    <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"*/}
                {/*         stroke="currentColor" aria-hidden="true">*/}
                {/*        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>*/}
                {/*    </svg>*/}
                {/*</button>*/}
                <button className="mr-1 right-0 size-12 focus:outline-none transition ease-in-out delay-50 hover:bg-gray-200 hover:text-fim"
                        onClick={() => signOut()}>
                    <LogoutIcon/>
                </button>
            </nav>
            {/*<div id="menu" className="hidden h-screen border-2">*/}
            {/*    <div className="float-left w-1/6 h-screen bg-white">*/}
            {/*        <div className="divide-y">*/}
            {/*            <button*/}
            {/*                className="w-full h-16 bg-white block rounded-sm px-3 py-2 text-lg font-semibold text-left text-base text-black focus:outline-none transition ease-in-out delay-50 hover:font-bold hover:text-fim hover:shadow-inner hover:border-3 shadow-lg">Účast*/}
            {/*            </button>*/}
            {/*            <button*/}
            {/*                className="w-full h-16 bg-white block rounded-sm px-3 py-2 text-lg font-semibold text-left text-base text-black focus:outline-none transition ease-in-out delay-50 hover:font-bold hover:text-fim hover:shadow-inner hover:border-3">Statistiky*/}
            {/*            </button>*/}
            {/*            <button*/}
            {/*                className="w-full h-16 bg-white block rounded-sm px-3 py-2 text-lg font-semibold text-left text-base text-black focus:outline-none transition ease-in-out delay-50 hover:font-bold hover:text-fim hover:shadow-inner hover:border-3">Účet*/}
            {/*            </button>*/}
            {/*            <button onClick={() => signOut()}*/}
            {/*                    className="w-full h-16 bg-white block rounded-sm px-3 py-2 text-lg font-semibold text-left text-base text-black focus:outline-none transition ease-in-out delay-50 hover:font-bold hover:text-red-500 hover:shadow-inner hover:border-3m">Odhlásit*/}
            {/*                se*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="size-full bg-gray-800/20" onClick={showMenu}></div>*/}
            {/*</div>*/}
        </div>
    )
}