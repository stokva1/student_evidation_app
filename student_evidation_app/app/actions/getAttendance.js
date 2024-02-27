"use server"
import prisma from "@/lib/prisma";

const getAttendance = async (scheduleActionID) => {
    //TODO: rename absenceinfo3 to absenceinfo in db and delete the others
    try {
        const attendance = await prisma.absenceinfo3.findMany({
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