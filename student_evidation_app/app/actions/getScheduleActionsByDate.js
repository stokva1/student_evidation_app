"use server"
import getLoggedUser from "../actions/getLoggedUser"
import prisma from "@/lib/prisma";
import { startOfWeek, endOfWeek } from 'date-fns';

const getScheduleActionsByDate = async (date) => {
    const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(date, { weekStartsOn: 1 });

    const loggedUser = await getLoggedUser()

    if (!loggedUser?.tTeacherID){
        return[];
    }

    try {
        const scheduleActions = await prisma.scheduleactioninfo.findMany({
            orderBy:{
                date: "asc"
            },
            where:{
                tTeacherID: loggedUser.tTeacherID,
                date: {
                    lte: endOfWeekDate,
                    gte: startOfWeekDate,
                }
            }
        });
        const result = {
            scheduleActions,
            week: {
                start: startOfWeekDate.getDate().toString() + "." + startOfWeekDate.getMonth().toString() + ".",
                end: endOfWeekDate.getDate().toString() + "." + endOfWeekDate.getMonth().toString() + "."
            }
        };

        return result
    }catch (error){
        return [];
    }
};

export default getScheduleActionsByDate;