"use server"
import getSession from "../actions/getSession";
import prisma from "../../lib/prisma"

const getLoggedUser = async () => {
    try {
        const session = await getSession();


        if (!session.user?.email) {
            return null
        }
        const loggedUser = await prisma.tteacher.findUnique({
            where: {
                tTeacherID: session.user.id
            }
        })

        if (!loggedUser) {
            return null
        }

        return loggedUser

    } catch (error) {
        return null
    }
}

export default getLoggedUser