"use client"

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import {useState} from "react";

export default function ScheduleActionCard({scheduleActions, onClick}) {
    const [activeButton, setActive] = useState();

    const handleClick = (e) => {
        e.style.textColor= "#009fdf"
    }

    return (
        // @ts-expect-error Server Component
        <>
            {scheduleActions.map((data, i) => (
                <button
                    key={i}
                    className="w-full h-min px-4 py-4 bg-white rounded-md z-0 shadow-md hover:text-white hover:bg-blue-400 hover:shadow-inner focus:outline focus:outline-1 focus:outline-white focus:bg-blue-400 focus:shadow-inner focus:text-white focus:ring has-[:focus]:bg-indigo-50 transition ease-in-out delay-50"
                    onClick={(e) => {
                        onClick(data.tScheduleActionID)
                        handleClick(e.target)
                    }}>
                    <h2 className="text-left text-2xl text-blue-500 font-bold leading-none tracking-tight">
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
                            {data.date.toLocaleString()}
                        </div>
                    </div>
                </button>
            ))}
        </>
    );
}