"use server"
import prisma from "@/lib/prisma";

async function getSubjectStudents(subjectID) {
    try {
        const enrolledStudents = await prisma.tenrolledstudents.findMany({
            where: {
                tSubjectID: subjectID,
            },
            include: {
                tstudent: true,
            },
        });

        return enrolledStudents;

    } catch (error) {
        return []
    }
}

export default getSubjectStudents;