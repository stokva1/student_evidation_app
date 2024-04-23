"use server"
import prisma from "@/lib/prisma"

async function isToken(newToken) {
    try {
        const token = await prisma.ttoken.findUnique({
            where: {
                token: newToken,
            },
        });
        if (!token) {
            return null
        } else {
            return token
        }

    } catch (error) {
        return null
    }
}

export default isToken