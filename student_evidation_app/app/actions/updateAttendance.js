"use server"
import prisma from "@/lib/prisma";

const updateAttendance = async (data) => {
    console.log(data)
    // try {
    //     await prisma.tattendance.updateMany({
    //         where: {
    //             tAttendanceID: data.attendanceID
    //         },
    //         data: {
    //             isExcused: data.isExcused
    //         }
    //     })
    // }catch (e) {
    //     return
    // }
}

export default updateAttendance;