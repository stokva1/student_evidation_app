"use server"
import prisma from "@/lib/prisma";
import getLoggedUser from "@/app/actions/getLoggedUser";
import {addWeeks, getDay} from "date-fns";
import {setWeek, nextMonday} from 'date-fns';


async function createScheduleAction(date, scheduleActionTypeID, subjectID, students) {
    const loggedUser = await getLoggedUser();

    if (!loggedUser?.tTeacherID) {
        return [];
    }

    try {
        console.log(loggedUser.tTeacherID)
        console.log("Date")
        console.log(date)
        console.log("SubjectID")
        console.log(subjectID)
        console.log("TypeID")
        console.log(scheduleActionTypeID)
        console.log("Students")
        console.log(students)


        const year = date.getFullYear()

        const winterStartDate = setWeek(nextMonday(new Date(year, 0, 4)), 38, {
            weekStartsOn: 1,
            firstWeekContainsDate: 4
        });

        const winterEndDate = setWeek(nextMonday(new Date(year, 0, 4)), 51, {
            weekStartsOn: 1,
            firstWeekContainsDate: 4
        });

        const summerStartDate = setWeek(nextMonday(new Date(year, 0, 4)), 6, {
            weekStartsOn: 1,
            firstWeekContainsDate: 4
        });

        const summerEndDate = setWeek(nextMonday(new Date(year, 0, 4)), 19, {
            weekStartsOn: 1,
            firstWeekContainsDate: 4
        });

        let endOfSemester = new Date()

        if (date > winterStartDate && date <= winterEndDate) {
            endOfSemester = winterEndDate
        } else if (date > summerStartDate && date <= summerEndDate) {
            endOfSemester = summerEndDate
        }

        while (new Date(date) <= endOfSemester) {
            const teacher = await prisma.tteacher.findUnique({where: {tTeacherID: loggedUser.tTeacherID}});
            const subject = await prisma.tsubject.findUnique({where: {tSubjectID: subjectID}});
            const scheduleActionType = await prisma.tscheduleactiontype.findUnique({where: {tScheduleActionType: scheduleActionTypeID}});

            if (!teacher || !subject || !scheduleActionType) {
                throw new Error('Related records do not exist');
            }

            const newScheduleAction = await prisma.tscheduleaction.create({
                data: {
                    date: new Date(date),
                    tTeacherID: loggedUser.tTeacherID,
                    tSubjectID: subjectID,
                    tScheduleActionTypeID: scheduleActionTypeID,
                },
            });

            for (const student of students) {

                let studentID
                const existingStudent = await prisma.tstudent.findUnique({
                    where: {
                        firstname: student.firstname,
                        surname: student.surname,
                        personalNum: student.personalNum,
                    },
                });

                if (!existingStudent) {
                    const newStudent = await prisma.tstudent.create({
                        data: {
                            firstname: student.firstname,
                            surname: student.surname,
                            personalNum: student.personalNum,
                        },
                    });

                    studentID = newStudent.tStudentID

                    await prisma.tenrolledstudents.create({
                        data: {
                            tStudentID: newStudent.tStudentID,
                            tSubjectID: subjectID,
                        },
                    });
                } else {
                    studentID = existingStudent.tStudentID

                    const alreadyEnrolled = await prisma.tenrolledstudents.findFirst({
                        where: {
                            tStudentID: studentID,
                            tSubjectID: subjectID,
                        }
                    })

                    if (!alreadyEnrolled) {
                        await prisma.tenrolledstudents.create({
                            data: {
                                tStudentID: studentID,
                                tSubjectID: subjectID,
                            },
                        });
                    }
                }

                await prisma.tattendance.create({
                    data: {
                        isPresent: false,
                        isExcused: false,
                        tStudentID: studentID,
                        tScheduleActionID: newScheduleAction.tScheduleActionID,
                    },
                });

                await prisma.tstudentsscheduleactions.create({
                    data: {
                        tStudentID: studentID,
                        tScheduleActionID: newScheduleAction.tScheduleActionID,
                    },
                });
            }

            date = addWeeks(new Date(date), 1)
        }

    } catch (error) {
        console.error(error);
    }
}

export default createScheduleAction;
