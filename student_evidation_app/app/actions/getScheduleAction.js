"use server"
import prisma from "@/lib/prisma";


const getData = async (id) => {
    const data = {}

    console.log(1, new Date().getSeconds(), new Date().getMilliseconds())
    
    const newAttendanceData = await getAttendance(id);
    data.attendanceData = newAttendanceData

    const newScheduleAction = await getScheduleAction(id);
    data.attendanceStatsArray = []

    for (const attendance of newAttendanceData) {
        data.attendanceStatsArray.push((await getAttendanceStats(attendance.firstname, newScheduleAction.tSubjectID, newScheduleAction.tTeacherID)))
    }
    data.attendanceStatsArray = data.attendanceStatsArray.flat()

    return data
}

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
const getAttendanceStats = async (name, tSubjectID, tTeacherID) => {
    try {
        const attendanceStats = await prisma.$queryRaw`SELECT s.firstname                                                          AS firstname,
                                                              s.surname                                                            AS surname,
                                                              COUNT(sa.tScheduleActionID)                                          AS totalActions,
                                                              SUM(CASE WHEN a.isPresent = 1 THEN 1 ELSE 0 END)                     AS presentCount,
                                                              SUM(CASE WHEN a.isPresent = 0 AND a.isExcused = 1 THEN 1 ELSE 0 END) AS excusedCount,
                                                              SUM(CASE WHEN a.isPresent = 0 AND a.isExcused = 0 THEN 1 ELSE 0 END) AS unexcusedCount
                                                       FROM tstudent s
                                                                JOIN
                                                            tstudentsscheduleactions sa ON s.tStudentID = sa.tStudentID
                                                                JOIN
                                                            tscheduleaction tsa ON sa.tScheduleActionID = tsa.tScheduleActionID
                                                                LEFT JOIN
                                                            tattendance a ON sa.tStudentID = a.tStudentID AND
                                                                             tsa.tScheduleActionID = a.tScheduleActionID
                                                       WHERE s.firstname = ${name}
                                                         AND tsa.tSubjectID = ${tSubjectID}
                                                         AND tsa.tTeacherID = ${tTeacherID}
                                                       GROUP BY s.tStudentID, s.firstname, s.surname, tsa.tTeacherID,
                                                                tsa.tSubjectID
                                                       ORDER BY s.surname, s.firstname;
        `
        const processedResult = attendanceStats.map((row) => ({
            ...row,
            totalActions: Number(row.totalActions),
            presentCount: Number(row.presentCount),
            excusedCount: Number(row.excusedCount),
            unexcusedCount: Number(row.unexcusedCount),

        }));

        return processedResult
    } catch (error) {
        return [];
    }
};
export default getData