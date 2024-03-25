"use server"
import prisma from "@/lib/prisma";

const getScheduleAction = async (id) => {

    try {
        const scheduleAction = await prisma.tscheduleaction.findUnique({
            where: {
                tScheduleActionID: id,
            }
        })
        return scheduleAction
    } catch (error) {
        return [];
    }
};

export default getScheduleAction