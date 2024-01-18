import {getSession} from "next-auth/react";
import prisma from "../../lib/prisma"

const getLoggedUser = async () => {
    try{
        const session = await getSession();
        console.log(session)


        if(session?.user?.email){
            return null
        }

        const loggedUser = await prisma.tteacher.findUnique({
            where:{
                email: session.user.email
            }
        })


        if(!loggedUser){
            return null
        }

        return loggedUser

    } catch (error){
        return null
    }
}

export default getLoggedUser