"use server"
import prisma from "@/lib/prisma";

const getAttendanceStats = async (name, tSubjectID, tTeacherID)=> {
    console.log(name);
    console.log(tSubjectID);
    console.log(tTeacherID);

    try {
        const attendanceStats = await prisma.$queryRaw`SELECT
                                                           s.firstname AS firstname,
                                                           s.surname AS surname,
                                                           COUNT(sa.tScheduleActionID) AS totalActions,
                                                           SUM(CASE WHEN a.isPresent = 1 THEN 1 ELSE 0 END) AS presentCount,
                                                           SUM(CASE WHEN a.isPresent = 0 AND a.isExcused = 1 THEN 1 ELSE 0 END) AS excusedCount,
                                                           SUM(CASE WHEN a.isPresent = 0 AND a.isExcused = 0 THEN 1 ELSE 0 END) AS unexcusedCount
                                                       FROM
                                                           tstudent s
                                                               JOIN
                                                           tstudentsscheduleactions sa ON s.tStudentID = sa.tStudentID
                                                               JOIN
                                                           tscheduleaction tsa ON sa.tScheduleActionID = tsa.tScheduleActionID
                                                               LEFT JOIN
                                                           tattendance a ON sa.tStudentID = a.tStudentID AND tsa.tScheduleActionID = a.tScheduleActionID
                                                       WHERE
                                                           s.firstname = ${name}
                                                         AND tsa.tSubjectID = ${tSubjectID}
                                                         AND tsa.tTeacherID = ${tTeacherID}
                                                       GROUP BY
                                                           s.tStudentID, s.firstname, s.surname, tsa.tTeacherID, tsa.tSubjectID
                                                       ORDER BY
                                                           s.surname, s.firstname;
        `
        const processedResult = attendanceStats.map((row) => ({
            ...row,
            totalActions: Number(row.totalActions),
            presentCount: Number(row.presentCount),
            excusedCount: Number(row.excusedCount),
            unexcusedCount: Number(row.unexcusedCount),

        }));

        console.log(processedResult);
        return processedResult
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default getAttendanceStats