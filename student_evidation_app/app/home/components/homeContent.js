"use client"

import ScheduleActionCard from "@/app/home/components/scheduleActionCard";
import {AttendanceCard} from "@/app/home/components/attendanceCard";
import {useEffect, useState} from "react";
import getAttendance from "@/app/actions/getAttendance";

export default function HomeContent({scheduleActions}) {
    const [attendanceData, setAttendanceData] = useState([]);
    const [attendance, setAttendance] = useState(false);


    const handleGetAttendanceData = async id => {
        const newAttendanceData = await getAttendance(id);
        setAttendanceData(newAttendanceData);
    };

    return (
        <>
            <div className="pt-16 flex flex-row">
                <div className="h-screen w-5/12 flex flex-col border-r-4">
                    <div className="bg-white float-start w-full h-32">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Rozvrhové akce
                        </h2>
                    </div>
                    <div className="mt-12 mx-12 h-full">
                        <div className="py-8 px-12 overflow-y-scroll h-full bg-sky-300 rounded-md space-y-6">
                            <ScheduleActionCard
                                scheduleActions={scheduleActions}
                                onClick={handleGetAttendanceData}
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-white float-start w-full h-32">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Docházka
                    </h2>
                    {attendance ?
                        <div className="divide-y mt-12">
                            <div className="flex flex-row px-5 py-2 text-center font-semibold ring-2 ring-gray-300">
                                <div className="w-32 mr-2">Jméno</div>
                                <div className="text-center ml-auto mr-32">Přítomen</div>
                                <div className="mr-44 ml-3">Omluven</div>
                                <div className="mr-36 ml-1">Typ absence</div>
                            </div>
                            <AttendanceCard attendance={attendanceData}/>
                        </div>
                        :
                        <div>
                            Nothing here
                        </div>
                    }
                </div>
            </div>
        </>
    );
}