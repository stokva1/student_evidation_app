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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {white} from "next/dist/lib/picocolors";
import {red} from "@mui/material/colors";

export default function HomeContent({scheduleActions}) {
    const [attendanceData, setAttendanceData] = useState([]);
    const [attendanceStats, setAttendanceStats] = useState([]);
    const [toggleContent, setToggleContent] = useState(true);
    const [showSideBar, setShowSideBar] = useState(true);



    const chartSetting = {
        width: 800,
        height: 600,
    };

    const handleGetAttendanceData = async id => {
        const newScheduleAction = await getData(id);
        setAttendanceData(newScheduleAction.attendanceData)
        setAttendanceStats(newScheduleAction.attendanceStatsArray)
    };

    // function showSideBar() {
    //     let x = document.getElementById("sideBar")
    //     if (x.style.display === "none") {
    //         x.style.display = "flex"
    //     } else {
    //         x.style.display = "none"
    //     }
    // }

    return (
        <>
            <div className="pt-14 flex flex-row h-screen">
                <button onClick={() => {setShowSideBar(!showSideBar)}}
                        className="absolute rounded-lg size-12 bg-fim top-1/2 block lg:hidden rotate-45 -translate-x-6 z-40">
                    <ArrowForwardIosIcon sx={{color: 'white'}} className="-rotate-45 translate-x-2 -translate-y-2"/>
                </button>
                <div className={(showSideBar ? "flex z-10" : "hidden") + " absolute lg:static bg-white w-full lg:w-5/12 lg:flex flex-col justify-center border-r-2 drop-shadow-lg"}>
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-fim">
                        Rozvrhové akce
                    </h2>
                    <div className="drop-shadow-lg text-fim outline outline-1 outline-fim self-center w-4/5 sm:w-3/5 lg:w-auto lg:mx-12 mt-12 mb-7 py-6 px-6 sm:px-12 max-h-min overflow-y-scroll rounded-md space-y-5">
                        <ScheduleActionCard
                            scheduleActions={scheduleActions}
                            onClick={handleGetAttendanceData}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full max-h-min">
                    <h2 className="mt-5 text-fim flex flex-col text-center justify-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Docházka
                    </h2>
                    {attendanceData.length === 0 || attendanceStats.length === 0 ? (
                        <div
                            className="h-1/2 flex flex-col text-center justify-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Nic tu není :(
                        </div>

                    ) : (
                        <div className="mb-12">
                            <div className="flex flex-row justify-between px-6 mb-4">
                                <div className="align-middle">Here</div>
                                <ToggleButtonGroup
                                    className=""
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
                                <div className="flex h-full justify-center items-center">
                                    <BarChart
                                        sx={{maxHeight: 'calc(100vh - 315px)', overflowY: 'scroll'}}
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
                    )}
                </div>
            </div>
        </>
    );
}