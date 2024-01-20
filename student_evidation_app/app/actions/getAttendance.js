"use server"
import prisma from "@/lib/prisma";

const getAttendance = async (scheduleActionID) => {
    try {
        const attendance = await prisma.absenceinfo.findMany({
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