import Image from "next/image";
import loginPick from "../../images/login_screen_background.jpg"
import RegisterForm from "@/app/register/components/registerForm";
import {redirect} from "next/navigation";
import validToken from "@/app/actions/validToken";

export default async function Register({searchParams}) {
    const token = searchParams.token

    const isValid = await validToken(token)

    const imageStyle = {
        display: "block",
        width: "100%",
        height: "auto",
        minWidth: "1620px",
        maxHeight: "1080px",
    }

    if (!isValid) {
        redirect("/")
        return
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
                <RegisterForm token={token}/>
            </div>
        </main>
    );
}


