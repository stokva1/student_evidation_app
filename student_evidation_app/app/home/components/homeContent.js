"use client"

import ScheduleActionCard from "@/app/home/components/scheduleActionCard";
import {AttendanceCard} from "@/app/home/components/attendanceCard";
import {useEffect, useState} from "react";
import getAttendance from "@/app/actions/getAttendance";
import getAttendanceStats from "@/app/actions/getAttendanceStats";
import getData from "@/app/actions/getScheduleAction";
import {BarChart} from '@mui/x-charts/BarChart';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function HomeContent({scheduleActions}) {
    const [attendanceData, setAttendanceData] = useState([]);
    const [attendanceStats, setAttendanceStats] = useState([]);
    const [toggleContent, setToggleContent] = useState(true);


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
                <div className="xl:w-5/12 flex flex-col border-r-4">
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
                <div className="flex flex-col w-full h-full">
                    <h2 className="h-1/6 flex flex-col text-center justify-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Docházka
                    </h2>
                    {attendanceData.length === 0 || attendanceStats.length === 0 ? (
                        <div className="h-full flex flex-col text-center justify-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Nic tu není :(
                        </div>

                    ) : (
                        <div className="divide-y h-full my-12">
                            <div>
                                <div className="flex w-full justify-center">
                                    <ToggleButtonGroup
                                        value={toggleContent}
                                        exclusive
                                    >
                                        <ToggleButton value="true" aria-label="" onChange={() => setToggleContent(true)}
                                                      sx={{
                                                          fontWeight: 'bold',
                                                          border: 2,
                                                          width: 125,
                                                          borderRadius: '6px'
                                                      }}>
                                            Docházka
                                        </ToggleButton>
                                        <ToggleButton value="false" aria-label=""
                                                      onChange={() => setToggleContent(false)} sx={{
                                            fontWeight: 'bold',
                                            border: 2,
                                            width: 125,
                                            borderRadius: '6px'
                                        }}>
                                            Grafy
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                                {toggleContent ? (
                                    <AttendanceCard attendance={attendanceData}/>
                                ) : (
                                    <div className="flex justify-center">
                                        <BarChart
                                            yAxis={[{data: attendanceStats.map(id => (id.surname)), scaleType: 'band'}]}
                                            series={[
                                                {
                                                    data: attendanceStats.map(id => (id.presentCount)),
                                                    stack: 'A',
                                                    label: 'Příomen'
                                                },
                                                {
                                                    data: attendanceStats.map(id => (id.excusedCount)),
                                                    stack: 'A',
                                                    label: 'Omluvené'
                                                },
                                                {
                                                    data: attendanceStats.map(id => (id.unexcusedCount)),
                                                    stack: 'A',
                                                    label: 'Neomluvené'
                                                },
                                            ]}
                                            layout="horizontal"
                                            {...chartSetting}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </>
    );
}