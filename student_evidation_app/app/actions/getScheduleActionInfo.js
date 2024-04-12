"use server"
import prisma from "@/lib/prisma";

const getScheduleActionsInfo = async (id) => {
    try {
        const scheduleActionInfo = await prisma.scheduleactioninfo.findUnique({
            where: {
                tScheduleActionID: id
            }
        });
        return scheduleActionInfo
    } catch (e) {
        return []
    }
}

export default getScheduleActionsInfo;