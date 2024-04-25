"use client"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useState} from "react";
import deleteScheduleAction from "@/app/actions/deleteScheduleAction";

export default function ScheduleActionCard({scheduleActions, onClick}) {
    const [activeButton, setActive] = useState(null)

    const handleClick = (e, actionId) => {
        setActive(actionId)
    }

    const handleDelete = async (id, e) => {
        e.stopPropagation()
        await deleteScheduleAction(id)
        onClick(null)
    }

    return (
        // @ts-expect-error Server Component
        <>
            {scheduleActions.map((data, i) => (
                <div key={i}
                     className={(activeButton === data.tScheduleActionID ? 'border-r-8 border-red-600' : '') + " relative w-full h-min px-4 py-4 bg-white rounded-md z-0 shadow-md hover:shadow-inner hover:translate-x-3 transition ease-in-out delay-50"}>
                    <button
                        className="absolute right-4 lg:right-2 xl:right-4 bottom-3 size-10 rounded-md text-red-600 hover:text-white hover:bg-red-500 transition ease-in-out delay-50"
                        onClick={(e) => {
                            handleDelete(data.tScheduleActionID, e).catch()
                            setActive(false)
                        }}>
                        <DeleteOutlineIcon/>
                    </button>
                    <button
                        className={"w-full h-full"}
                        onClick={(e) => {
                            onClick(data.tScheduleActionID)
                            handleClick(e.target, data.tScheduleActionID)
                        }}>

                        <h2 className="text-left text-2xl font-bold leading-none tracking-tight text-blue-500">
                            {data.subjectName}
                        </h2>
                        <div className="text-left">
                            {data.type}
                        </div>
                        <div className="align-text-top flex flex-row">
                            <PersonIcon/>
                            <div>
                                {data.studentCount.toString()}
                            </div>
                        </div>
                        <div className="align-sub flex flex-row">
                            <CalendarMonthIcon/>
                            <div>
                                {data.date.toLocaleDateString() + " " + data.date.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </div>
                        </div>
                    </button>
                </div>
            ))}
        </>
    );
}