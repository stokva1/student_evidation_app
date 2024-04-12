"use server"
import prisma from "@/lib/prisma";
import getLoggedUser from "@/app/actions/getLoggedUser";

async function getAllSubjects() {
    const loggedUser = await getLoggedUser()

    if (!loggedUser?.tTeacherID) {
        return []
    }

    try {
        const subjectsWithStudents = await prisma.tteacherssubjects.findMany({
            where: {
                tTeacherID: loggedUser.tTeacherID,
            },
            include: {
                tsubject: {
                    include: {
                        tenrolledstudents: {
                            include: {
                                tstudent: true,
                            },
                        },
                    },
                },
            },
        });

        return subjectsWithStudents
    } catch (e) {
        return []
    }
}

export default getAllSubjects;