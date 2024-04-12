"use server"
import prisma from "@/lib/prisma";
import getLoggedUser from "@/app/actions/getLoggedUser";

async function addSubject(name){
    const loggedUser = await getLoggedUser()

    if (!loggedUser?.tTeacherID){
        return[]
    }

    try {
        const newSubject = await prisma.tsubject.create({
            data: {
                name: name,
            },
        });

        await prisma.tteacherssubjects.create({
            data: {
                tSubjectID: newSubject.tSubjectID,
                tTeacherID: loggedUser.tTeacherID,
            }
        })
    }catch (e) {
        console.log(e)
    }
}

export default addSubject;


