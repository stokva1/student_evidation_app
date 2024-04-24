"use client"
import LoginForm from "@/components/loginForm";
import Image from "next/image";
import loginPick from "../images/login_screen_background.jpg"
import EmailForm from "@/components/emailForm";
import {useState} from "react";

export default function Login() {
    const [login, setLogin] = useState(false)
    const [email, setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)

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

    const handleEmailSent = () => {
        setEmailSent(true)
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
                {emailSent ? (
                    <div className="absolute bg-white border-2 border-fim drop-shadow-lg rounded-lg flex flex-1 flex-col justify-center px-6 py-10 sm:px-12 sm:border-0">
                        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">
                            Zkontrolujte email, pro dokončení registrace.
                        </h2>
                    </div>
                ) : (
                    <>
                        {login ? (
                            <LoginForm defaultEmail={email}/>
                        ) : (
                            <EmailForm
                                userExist={userHasPassword}
                                emailValue={handleEmail}
                                emailSent={handleEmailSent}
                            />
                        )}
                    </>
                )}
            </div>
        </main>
    );
}


