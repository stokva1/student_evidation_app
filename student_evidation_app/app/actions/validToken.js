"use server"
import prisma from "@/lib/prisma";

async function validToken(token) {
    try {
        console.log(token)
        const isToken = await prisma.ttoken.findUnique({
            where: {
                token: token,
                expiresAt: {
                    gt: new Date()
                },
            }
        })

        return !!isToken

    } catch (e) {
        return false
    }
}

export default validToken