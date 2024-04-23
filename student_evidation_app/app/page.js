"use client"
import LoginForm from "@/components/loginForm";
import Image from "next/image";
import loginPick from "../images/login_screen_background.jpg"
import EmailForm from "@/components/emailForm";
import {useState} from "react";

export default function Login() {
    const [login, setLogin] = useState(false)
    const [email, setEmail] = useState("")

    const imageStyle = {
        display: "block",
        width: "100%",
        height: "auto",
        minWidth: "1620px",
        maxHeight: "1080px",
    }

    const userHasPassword = (letLogin) => {
        if (letLogin) {
            setLogin(true)
        }
    }

    const handleEmail = (email) => {
        setEmail(email)
    }

    return (
        <main>
            <div className="flex h-screen justify-center items-center overflow-hidden">
                <div className="flex-1 hidden sm:block">
                    <Image className="min-h-screen min-w-screen"
                           src={loginPick}
                           quality={50}
                           placeholder={"blur"}
                           style={imageStyle}
                           alt="tři studenti na schodech"/>
                </div>
                {login ? (
                    <LoginForm defaultEmail={email}/>
                ) : (
                    <EmailForm userExist={userHasPassword} emailValue={handleEmail}/>
                )}
            </div>
        </main>
    );
}


