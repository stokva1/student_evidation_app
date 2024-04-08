import {withAuth} from "next-auth/middleware";

export default withAuth({
    pages:{
        signIn: "/",
    }
})

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|register).*)'
    ]
};