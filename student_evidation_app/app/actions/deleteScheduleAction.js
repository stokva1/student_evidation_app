"use server"
import prisma from "@/lib/prisma";

const deleteScheduleAction = async (scheduleActionID) => {
    try {
        await prisma.tattendance.deleteMany({
            where: {
                tScheduleActionID: scheduleActionID
            },
        })

        await prisma.tstudentsscheduleactions.deleteMany({
            where: {
                tScheduleActionID: scheduleActionID
            }
        })

        await prisma.tscheduleaction.delete({
            where: {
                tScheduleActionID: scheduleActionID
            },
        })
    } catch (error) {
        console.log(error)
    }
}

export default deleteScheduleAction