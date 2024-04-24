"use server"
import getScheduleAction from "@/app/actions/getScheduleAction"
import getAttendance from "@/app/actions/getAttendance";
import getAttendanceStats from "@/app/actions/getAttendanceStats";

const getData = async (id) => {
    try {
        const data = {}

        const newAttendanceData = await getAttendance(id)
        data.attendanceData = newAttendanceData

        const newScheduleAction = await getScheduleAction(id)
        data.attendanceStatsArray = []

        for (const attendance of newAttendanceData) {
            data.attendanceStatsArray.push((await getAttendanceStats(attendance.firstname, newScheduleAction.tSubjectID, newScheduleAction.tTeacherID)))
        }
        data.attendanceStatsArray = data.attendanceStatsArray.flat()

        return data
    }catch (e) {
        console.log(e)
    }
}

export default getData