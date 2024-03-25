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
        if (data.attendanceID === 54){
            console.log(data)
        }
    }catch (e) {
        console.log(e)
        return
    }
}

export default updateAttendance;