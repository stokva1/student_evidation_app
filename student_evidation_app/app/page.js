import LoginForm from "@/components/loginForm";
import Image from "next/image";
import loginPick from "../images/login_screen_background.jpg"

export default function Login() {
    const imageStyle = {
        display: "block",
        width: "100%",
        height: "auto",
        minWidth: "1620px",
        maxHeight: "1080px",
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
                           alt="three sudents on stairs"/>
                </div>
                <LoginForm/>
            </div>
        </main>
    );
}


