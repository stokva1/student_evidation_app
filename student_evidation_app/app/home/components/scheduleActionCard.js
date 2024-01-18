"use client"

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import getScheduleActions from "@/app/actions/getScheduleActions";

export default function ScheduleActionCard({scheduleActions, onClick, scheduleActionID}) {
    // const scheduleAction = await getScheduleActions();

    return (
        // @ts-expect-error Server Component
        <>
            {scheduleActions.map(data => (
                <div
                    className="w-full h-fit px-4 py-4 bg-white rounded-md z-0 shadow-md hover:text-fim hover:shadow-inner hover:ring"
                    onClick={() => {
                        onClick()
                        scheduleActionID = data.tScheduleActionID
                    }}>
                    <h2 className="text-left text-2xl font-bold leading-none tracking-tight">
                        {data.subjectName}
                    </h2>
                    <div>
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
                </div>
            ))}
        </>
    );
}