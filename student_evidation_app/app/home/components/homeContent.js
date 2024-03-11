"use client"

import ScheduleActionCard from "@/app/home/components/scheduleActionCard";
import {AttendanceCard} from "@/app/home/components/attendanceCard";
import {useEffect, useState} from "react";
import getAttendance from "@/app/actions/getAttendance";
import getAttendanceStats from "@/app/actions/getAttendanceStats";
import getData from "@/app/actions/getScheduleAction";
import {BarChart} from '@mui/x-charts/BarChart';

export default function HomeContent({scheduleActions}) {
    const [attendanceData, setAttendanceData] = useState([]);
    const [attendanceStats, setAttendanceStats] = useState([]);


    const chartSetting = {
        width: 800,
        height: 600,
    };

    const handleGetAttendanceData = async id => {
        const newScheduleAction = await getData(id);
        setAttendanceData(newScheduleAction.attendanceData)
        setAttendanceStats(newScheduleAction.attendanceStatsArray)
    };

    return (
        <>
            <div className="pt-16 flex flex-row h-screen">
                <div className="w-5/12 flex flex-col border-r-4">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Rozvrhové akce
                    </h2>
                    <div className="m-12 py-8 px-12 max-h-min overflow-y-scroll bg-sky-300 rounded-md space-y-6">
                        <ScheduleActionCard
                            scheduleActions={scheduleActions}
                            onClick={handleGetAttendanceData}
                        />
                    </div>
                </div>
                <div className="bg-white float-start w-full h-32">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Docházka
                    </h2>
                    <div className="divide-y mt-12">
                        {attendanceData.length === 0 || attendanceStats.length === 0 ? (
                            <div
                                className="text-center py-60 text-2xl font-semibold leading-9 tracking-tight text-gray-900">
                                <div>Nothing here :(</div>
                            </div>

                        ) : (
                            // <AttendanceCard attendance={attendanceData}/>
                            <BarChart
                                sx={{
                                    mx: '100%'
                                }}
                                yAxis={[{data: attendanceStats.map(id => (id.surname)), scaleType: 'band'}]}
                                series={[
                                    {data: attendanceStats.map(id => (id.presentCount)), stack: 'A', label: 'Příomen'},
                                    {data: attendanceStats.map(id => (id.excusedCount)), stack: 'A', label: 'Omluvené'},
                                    {
                                        data: attendanceStats.map(id => (id.unexcusedCount)),
                                        stack: 'A',
                                        label: 'Neomluvené'
                                    },
                                ]}
                                layout="horizontal"
                                {...chartSetting}
                            />
                        )}
                    </div>
                    {/*{attendance ?*/}
                    {/*    */}
                    {/*    :*/}
                    {/*    <div>*/}
                    {/*        Nothing here*/}
                    {/*    </div>*/}
                    {/*}*/}
                </div>
            </div>
        </>
    );
}