"use server"
import getLoggedUser from "../actions/getLoggedUser"
import prisma from "@/lib/prisma";


const getScheduleActions = async () => {
    const loggedUser = await getLoggedUser()

    if (!loggedUser?.tTeacherID){
        return[];
    }

    try {
        const scheduleActions = await prisma.scheduleactioninfo.findMany({
            orderBy:{
                date: "desc"
            },
            where:{
                tTeacherID: loggedUser.tTeacherID
            }
        });

        return scheduleActions
    }catch (error){
        return [];
    }
};

export default getScheduleActions;