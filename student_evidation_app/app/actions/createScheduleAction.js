"use server"
import prisma from "@/lib/prisma";
import getLoggedUser from "@/app/actions/getLoggedUser";


async function createScheduleAction(date, subjectId, scheduleActionTypeId, students) {
    const loggedUser = await getLoggedUser()

    if (!loggedUser?.tTeacherID){
        return[];
    }

    try {
        const teacher = await prisma.tteacher.findUnique({ where: { tTeacherID: loggedUser.tTeacherID } });
        const subject = await prisma.tsubject.findUnique({ where: { tSubjectID: subjectId } });
        const scheduleActionType = await prisma.tscheduleactiontype.findUnique({ where: { tScheduleActionType: scheduleActionTypeId } });

        if (!teacher || !subject || !scheduleActionType) {
            throw new Error('Related records do not exist');
        }

        const newScheduleAction = await prisma.tscheduleaction.create({
            data: {
                date: new Date(date),
                tTeacherID: loggedUser.tTeacherID,
                tSubjectID: subjectId,
                tScheduleActionTypeID: scheduleActionTypeId,
            },
        });

        return newScheduleAction;
    }catch (error){
        return []
    }
}

export default createScheduleAction