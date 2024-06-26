"use client"
import ScheduleActionCard from "@/app/home/components/scheduleActionCard";
import {AttendanceCard} from "@/app/home/components/attendanceCard";
import {useEffect, useState} from "react";
import getData from "@/app/actions/getData";
import {BarChart} from '@mui/x-charts/BarChart';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import getScheduleActionInfo from "@/app/actions/getScheduleActionInfo";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import getScheduleActionsByDate from "@/app/actions/getScheduleActionsByDate";
import {addWeeks} from "date-fns";
import {ScheduleActionCreateDialog} from "@/app/home/components/scheduleActionCreateDialog";

export default function HomeContent() {
    const [attendanceData, setAttendanceData] = useState([])
    const [attendanceStats, setAttendanceStats] = useState([])
    const [toggleContent, setToggleContent] = useState(true)
    const [showSideBar, setShowSideBar] = useState(true)
    const [scheduleAction, setScheduleAction] = useState({})
    const [date, setDate] = useState(new Date())
    const [scheduleActions, setScheduleActions] = useState([])
    const [week, setWeek] = useState({})
    const [id, setId] = useState("")

    useEffect(() => {
        getDate(date).catch()
    }, [])

    const getDate = async (dates) => {
        setDate(dates)
        const newScheduleActions = await getScheduleActionsByDate(dates)
        setScheduleActions(newScheduleActions.scheduleActions)
        setWeek(newScheduleActions.week)
    }

    const chartSetting = {
        width: 800,
        height: 600,
    }

    const handleGetAttendanceData = async (id) => {
        if (id === null) {
            const newScheduleActions = await getScheduleActionsByDate(date)
            setScheduleActions(newScheduleActions.scheduleActions)
            setAttendanceData([])
            setAttendanceStats([])
        } else {
            setId(id)
            const newScheduleAction = await getData(id)
            setAttendanceData(newScheduleAction.attendanceData)
            setAttendanceStats(newScheduleAction.attendanceStatsArray)
            const scheduleActionInfo = await getScheduleActionInfo(id)
            setScheduleAction(scheduleActionInfo)
        }
    }

    const updateStats = async () => {
        const newScheduleAction = await getData(id)
        setAttendanceStats(newScheduleAction.attendanceStatsArray)
    }

    const handleActionAdd = async () => {
        getDate(date).catch()
    }

    return (
        <>
            <div className="pt-14 flex flex-row h-full text-gray-900 z-0">
                <button onClick={() => {
                    setShowSideBar(!showSideBar)
                }}
                        className="absolute rounded-lg size-12 bg-white outline outline-1 outline-gray-600 drop-shadow-lg top-1/2 block lg:hidden rotate-45 -translate-x-6 z-40">
                    <ArrowForwardIosIcon sx={{color: 'white'}}
                                         className="text-fim -rotate-45 translate-x-2 -translate-y-2"
                    />
                </button>
                <div
                    className={(showSideBar ? "flex z-10" : "hidden") + " absolute lg:static bg-gradient-to-b from-blue-500 to-blue-400 size-full lg:w-5/12 lg:flex flex-col border-r-2 drop-shadow-lg"}>
                    <h2 className="mt-5 text-white text-center text-2xl font-bold leading-9 tracking-tight">
                        Rozvrhové akce
                    </h2>
                    <ScheduleActionCreateDialog onScheduleActionAdded={handleActionAdd}/>
                    <div className="flex justify-center text-white mt-4 mb-4">
                        <button
                            className="size-10 hover:bg-white hover:text-blue-500 rounded-md text-center pl-2 pb-0.5 transition ease-in-out delay-50"
                            onClick={() =>
                                getDate(addWeeks(new Date(date), -1))
                            }>
                            <ArrowBackIosIcon/>
                        </button>
                        <div
                            className="w-16 flex flex-col text-center justify-center text-lg font-bold leading-9 tracking-tight mr-1">{week.start}</div>
                        <div
                            className="w-16 flex flex-col text-center justify-center text-lg font-bold leading-9 tracking-tight ml-1">{week.end}</div>
                        <button
                            className="size-10 hover:bg-white hover:text-blue-500 rounded-md text-center pl-0.5 pb-0.5 transition ease-in-out delay-50"
                            onClick={() =>
                                getDate(addWeeks(new Date(date), 1))
                            }>
                            <ArrowForwardIosIcon/>
                        </button>
                    </div>
                    {scheduleActions.length === 0 ? (
                        <div
                            className="h-1/2 flex flex-col text-center justify-center text-2xl font-bold leading-9 tracking-tight text-white">
                            Žádné rozvrhov akce
                        </div>
                    ) : (
                        <div
                            className="drop-shadow-lg text-gray-900 self-center w-full sm:w-3/5 lg:w-full h-full pt-6 pb-10 px-8 sm:px-12 overflow-y-scroll rounded-md space-y-5">
                            <ScheduleActionCard
                                scheduleActions={scheduleActions}
                                onClick={handleGetAttendanceData}
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col w-full max-h-min">
                    <h2 className="mt-5 mb-2 lg:mb-0 text-fim flex flex-col text-center justify-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Docházka
                    </h2>
                    {attendanceData.length === 0 || attendanceStats.length === 0 ? (
                        <div
                            className="h-4/5 flex flex-col text-center justify-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Není vybrána žádná rozvrhová akce
                        </div>
                    ) : (
                        <div className={(toggleContent ? "" : "overflow-y-hidden") + " mb-12"}>
                            <div
                                className="flex flex-col space-y-3 lg:flex-row justify-center items-center lg:justify-between px-6 mb-4">
                                <div className="text-center lg:text-left ">
                                    <h2 className="text-2xl font-bold leading-none tracking-tight">
                                        {scheduleAction.subjectName}
                                    </h2>
                                    <div>
                                        {scheduleAction.type}
                                    </div>
                                    <div className="align-sub flex flex-row">
                                        <CalendarMonthIcon/>
                                        <div>
                                            {scheduleAction.date && scheduleAction.date.toLocaleDateString() + " " + scheduleAction.date.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="h-1/2 mt-auto hidden lg:block">
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
                                            Seznam
                                        </ToggleButton>
                                        <ToggleButton value="false" aria-label=""
                                                      onChange={() => setToggleContent(false)} sx={{
                                            fontWeight: 'bold',
                                            border: 2,
                                            width: 125,
                                            borderRadius: '6px'
                                        }}>
                                            Graf
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </div>
                            {toggleContent ? (
                                <AttendanceCard
                                    attendance={attendanceData}
                                    onClick={updateStats}
                                />
                            ) : (
                                <div className="hidden lg:flex justify-center items-center h-full">
                                    <BarChart
                                        sx={{maxHeight: 'calc(100vh - 315px)', width: "500px", overflowY: 'scroll'}}
                                        yAxis={[
                                            {
                                                data: attendanceStats.map(id => (id.surname)),
                                                scaleType: 'band'
                                            }
                                        ]}
                                        xAxis={[{tickMinStep: 1}]}
                                        series={[
                                            {
                                                data: attendanceStats.map(id => (id.presentCount)),
                                                stack: 'A',
                                                label: 'Příomen',
                                                color: 'rgb(21 128 61)'
                                            },
                                            {
                                                data: attendanceStats.map(id => (id.excusedCount)),
                                                stack: 'A',
                                                label: 'Omluvené',
                                                color: 'rgb(59 130 246)'
                                            },
                                            {
                                                data: attendanceStats.map(id => (id.unexcusedCount)),
                                                stack: 'A',
                                                label: 'Neomluvené',
                                                color: 'rgb(239 68 68)'

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
    )
}