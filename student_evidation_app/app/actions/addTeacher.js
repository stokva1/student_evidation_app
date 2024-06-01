"use server"
import prisma from "@/lib/prisma";

async function addTeacher(email){
    const user = await prisma.tlogin.findUnique({
        where: {email: email},
    })

    if (!user) {
        try {
            await prisma.tlogin.create({
                data: {
                    email: email,
                    password: "",
                },
            })
        }catch (error) {
            console.log(error)
        }
    }
}

export default addTeacher


