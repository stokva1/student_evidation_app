"use server"
import prisma from "@/lib/prisma";

const getScheduleActionType = async () => {
    try {
        const scheduleAction = await prisma.tscheduleactiontype.findMany()
        return scheduleAction

    } catch (error) {
        return []
    }
}

export default getScheduleActionType