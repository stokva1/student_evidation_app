"use server"
import prisma from "@/lib/prisma"

async function getUserByEmail(email) {
    try {
        const user = await prisma.tlogin.findUnique({
            where: {email: email},
        });

        if (!user) {
            return null
        }

        return user

    } catch (error) {
        return null
    }
}

export default getUserByEmail