"use server"
import prisma from "@/lib/prisma";


const getScheduleActionsInfo = async (id) => {
    try {
        const scheduleActionInfo = await prisma.scheduleactioninfo.findUnique({
            where:{
                tScheduleActionID: id
            }
        });
        console.log(scheduleActionInfo)
        return scheduleActionInfo
    }catch (error){
        return [];
    }
};

export default getScheduleActionsInfo;