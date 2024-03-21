import LoginForm from "@/components/loginForm";
import Image from "next/image";
import loginPick from "../images/login_screen_background.jpg"

export default function Login() {
    return (
        <main>
            <div className="flex h-screen justify-center items-center overflow-hidden">
                <div className="flex-1">
                    <Image className="min-h-screen min-w-screen"
                           src={loginPick}
                           width="auto"
                           height="auto"
                           alt="three sudents on stairs"/>
                </div>
                <div className="absolute my-auto bg-white rounded-lg">
                    <LoginForm/>
                </div>
            </div>
        </main>
    );
}


