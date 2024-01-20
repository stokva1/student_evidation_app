"use client"

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';

export default function ScheduleActionCard({scheduleActions, onClick}) {
    return (
        // @ts-expect-error Server Component
        <>
            {scheduleActions.map((data, i) => (
                <button
                    key={i}
                    className="w-full h-fit px-4 py-4 bg-white rounded-md z-0 shadow-md hover:text-fim hover:shadow-inner hover:ring"
                    onClick={() => onClick(data.tScheduleActionID)}>
                    <h2 className="text-left text-2xl font-bold leading-none tracking-tight">
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