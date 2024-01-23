"use server"
import prisma from "@/lib/prisma";

const getAttendance = async (scheduleActionID) => {
    try {
        const attendance = await prisma.absenceinfo2.findMany({
            orderBy: {
                surname: "asc"
            },
            where: {
                scheduleActionID: scheduleActionID
            },
        });
        return attendance
    } catch (error) {
        return [];
    }
};

export default getAttendance;