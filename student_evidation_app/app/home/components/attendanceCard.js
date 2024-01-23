"use client"

import {useEffect, useState} from "react";
import {data} from "autoprefixer";
import PresenceCard from "@/app/home/components/presenceCard";
import Checkbox from '@mui/material/Checkbox';

export function AttendanceCard({attendance}) {
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};

    return (
        <form>
            {attendance.map((data) => (
                <div key={data.tAttendanceID} className="h-16 flex flex-row px-5 py-2">
                    <div className="my-auto w-48">{data.surname} {data.firstname}</div>
                    <PresenceCard key={data.tAttendanceID} isPresent={data.isPresent}/>
                    <div className="mr-40">
                        <Checkbox {...label} defaultChecked={data.isExcused}/>
                    </div>
                    <select key={data.tAttendanceID} className="rounded-md border-2 border-fim mr-24"
                            defaultValue={data.absencetype ? data.absencetype.toString() : ""}>
                        <option>Nemoc</option>
                        <option>Rodinné důvody</option>
                        <option>Problém s dopravou</option>
                        <option>Zaspání</option>
                        <option>Školní akce</option>
                        <option>Jiné</option>
                    </select>
                </div>
            ))}
            <div className="w-full flex justify-center py-2 mx-auto">
                <button type="submit"
                        className="w-28 h-12 mx-auto rounded-md px-3 py-1.5 text-sm font-semibold shadow-md border-2 border-black hover:text-fim hover:border-fim hover:shadow-inner">SAVE
                </button>
            </div>
        </form>
    )
}