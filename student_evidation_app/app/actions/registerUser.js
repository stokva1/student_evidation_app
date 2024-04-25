"use server"
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";


async function registerUser(firstname, surname, password, tokenObject) {
    let existingLogin = {}

    try {
        existingLogin = await prisma.tlogin.findUnique({
            where: {
                email: tokenObject.email,
                password: {
                    not: {
                        equals: "",
                    },
                },
            },
        })
    } catch (error) {
        console.log(error)
    }

    if (!existingLogin && tokenObject.expiresAt.getTime() > Date.now()) {

        try {
            const hashedPassword = await bcrypt.hash(password, 10)

            const tokenRecord = await prisma.ttoken.findUnique({
                where: {
                    token: tokenObject.token,
                },
            })

            if (!tokenRecord) {
                throw new Error("Token not found")
            }

            const login = await prisma.tlogin.update({
                where: {
                    email: tokenRecord.email,
                },
                data: {
                    password: hashedPassword,
                },
            })

            await prisma.tteacher.upsert({
                where: {tLoginID: login.tLoginID},
                update: {},
                create: {
                    firstname: firstname,
                    surname: surname,
                    tLoginID: login.tLoginID,
                },
            })

            await prisma.ttoken.delete({
                where: {
                    token: tokenObject.token,
                }
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export default registerUser