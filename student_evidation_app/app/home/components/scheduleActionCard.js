"use client"

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import {useState} from "react";

export default function ScheduleActionCard({scheduleActions, onClick}) {
    const [activeButton, setActive] = useState(null);

    const handleClick = (e, actionId) => {
        setActive(actionId);
    }

    return (
        // @ts-expect-error Server Component
        <>
            {scheduleActions.map((data, i) => (
                <button
                    key={i}
                    className={(activeButton === data.tScheduleActionID ? 'border-r-8 border-red-600' : '') + " w-full h-min px-4 py-4 bg-white rounded-md z-0 shadow-md hover:shadow-inner hover:translate-x-3 transition ease-in-out delay-50"}
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
                            {data.date.toLocaleString()}
                        </div>
                    </div>
                </button>
            ))}
        </>
    );
}