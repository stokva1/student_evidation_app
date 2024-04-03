"use server"
import prisma from "@/lib/prisma";
import getLoggedUser from "@/app/actions/getLoggedUser";
import {addWeeks} from "date-fns";


async function createScheduleAction(date, subjectId, scheduleActionTypeId, students) {
    const loggedUser = await getLoggedUser();

    if (!loggedUser?.tTeacherID) {
        return [];
    }

    try {
        console.log("Date")
        console.log(date)
        console.log("SubjectID")
        console.log(subjectId)
        console.log("TypeID")
        console.log(scheduleActionTypeId)
        console.log("Students")
        console.log(students)

        const endOfSchoolYear = new Date(2024, 7, 3, 12, 0, 0);

        // while (new Date(date) <= endOfSchoolYear) {
            const teacher = await prisma.tteacher.findUnique({ where: { tTeacherID: loggedUser.tTeacherID } });
            const subject = await prisma.tsubject.findUnique({ where: { tSubjectID: subjectId } });
            const scheduleActionType = await prisma.tscheduleactiontype.findUnique({ where: { tScheduleActionType: scheduleActionTypeId } });

            if (!teacher || !subject || !scheduleActionType) {
                throw new Error('Related records do not exist');
            }



            // const newScheduleAction = await prisma.tscheduleaction.create({
            //     data: {
            //         date: new Date(date),
            //         tTeacherID: loggedUser.tTeacherID,
            //         tSubjectID: subjectId,
            //         tScheduleActionTypeID: scheduleActionTypeId,
            //     },
            // });
            //
            for (const student of students) {
                let username = student.surname.substring(0, 4).toLowerCase() + student.firstname.substring(0, 2).toLowerCase();
                let counter = 1;
                let exists = true;

                while (exists) {
                    const existingUser = await prisma.tstudent.findUnique({
                        where: { userName: `${username}${counter}` },
                    });

                    if (existingUser) {
                        counter++;
                    } else {
                        username = `${username}${counter}`
                        exists = false;
                        console.log(username)
                    }
                }
            //     let studentId
            //     const existingStudent = await prisma.tstudent.findUnique({
            //         where: {
            //             firstname: student.firstname,
            //             surname: student.surname,
            //         },
            //     });
            //
            //     if (!existingStudent) {
            //         const newStudent = await prisma.tstudent.create({
            //             data: {
            //                 firstname: student.firstname,
            //                 surname: student.surname,
            //                 phoneNumber: '',
            //             },
            //         });
            //
            //         studentId = newStudent.tStudentID
            //
            //         await prisma.tenrolledstudents.create({
            //             data: {
            //                 tStudentID: newStudent.tStudentID,
            //                 tSubjectID: subjectId,
            //             },
            //         });
            //     }else {
            //         studentId = existingStudent.tStudentID
            //     }
            //
            //     await prisma.tattendance.create({
            //         data: {
            //             isPresent: false,
            //             tStudentID: studentId,
            //             tScheduleActionID: newScheduleAction.tScheduleActionID,
            //         },
            //     });
            //
            //     await prisma.tstudentsscheduleactions.create({
            //         data: {
            //             tStudentID: studentId,
            //             tScheduleActionID: newScheduleAction.tScheduleActionID,
            //         },
            //     });
            }

            // date = addWeeks(new Date(date), 1)
        // }

    } catch (error) {
        console.error(error);
    }
}

export default createScheduleAction;
