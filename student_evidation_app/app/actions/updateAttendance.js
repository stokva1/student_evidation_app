"use server"
import prisma from "@/lib/prisma";

const updateAttendance = async (data) => {
    try {
        await prisma.tattendance.updateMany({
            where: {
                tAttendanceID: data.attendanceID
            },
            data: {
                isPresent: data.isPresent,
                isExcused: data.isExcused,
                tAbsenceTypeID: data.absencetypeID,
            }
        })
    } catch (error) {
        console.log(error)
        return
    }
}

export default updateAttendance;