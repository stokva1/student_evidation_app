"use server"
import prisma from "@/lib/prisma";

async function addSubject(name){
    try {
        await prisma.tsubject.create({
            data: {
                name: name,
            },
        });
    }catch (e) {
        console.log(e)
    }
}

export default addSubject;


