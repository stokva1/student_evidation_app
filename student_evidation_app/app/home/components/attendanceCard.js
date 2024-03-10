"use client"

import {useEffect, useState} from "react";
import PresenceCard from "@/app/home/components/presenceCard";
import Checkbox from '@mui/material/Checkbox';
import updateAttendance from "@/app/actions/updateAttendance";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Grow from '@mui/material/Grow';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

export function AttendanceCard({attendance}) {
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};
    const [open, setOpen] = useState(false);

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'attendance';
    const attendanceData = attendance.map(function (item) {
        const {tAttendanceID, scheduleActionID, tAbsenceTypeID, ...newItem} = item;
        return newItem;
    })

    const exportToExcel = async (data) => {
        const ws = XLSX.utils.json_to_sheet(data);
        ws['!cols'] = [
            {width: 20},
            {width: 20},
            {width: 15},
            {width: 15},
            {width: 50}
        ];
        XLSX.utils.sheet_add_aoa(ws, [["Jméno", "Příjmení", "Přítomen", "Omluveno", "Důvod absence"]], {origin: "A1"});
        const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        const excelData = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(excelData, fileName + fileExtension);
    }

    const handleSubmit = async (e) => {
        console.log(open)
        e.preventDefault()
        await attendance.map((x) => (
            updateAttendance({
                attendanceID: x.tAttendanceID,
                isPresent: x.isPresent,
                isExcused: x.isExcused,
                absencetypeID: x.tAbsenceTypeID,
            })
        ))
        setOpen(true)
    }
    //TODO: set select to empty string if data.absencetype is null
    //TODO: Fix map key error
    //TODO: Move alert and make visible for a bit longer

    return (
        <>
            <div className="flex flex-row px-5 py-2 text-center font-semibold ring-2 ring-gray-300">
                <div className="w-32 mr-2">Jméno</div>
                <button className="text-center ml-auto mr-32">Přítomen</button>
                <button className="mr-44 ml-3">Omluven</button>
                <div className="mr-36 ml-1">Typ absence</div>
            </div>
            <form className="overflow-y-scroll divide-y">
                <Snackbar open={open} onClose={() => setOpen(false)} TransitionComponent={Grow} autoHideDuration={1200}>
                    <Alert severity="success" variant="filled" sx={{width: '100%'}}>
                        Data were successfully saved!
                    </Alert>
                </Snackbar>
                {attendance.map((data) => (
                    <div key={data.tAttendanceID} className="h-16 flex flex-row px-5 py-2">
                        <button className="my-auto w-48 text-left" type="button">
                            {data.surname} {data.firstname}
                        </button>
                        <PresenceCard key={data.tAttendanceID} isPresent={data.isPresent} onClick={() => {
                            data.isPresent = !data.isPresent
                        }}/>
                        <div className="mr-40">
                            <Checkbox {...label} defaultChecked={data.isExcused} onClick={() => {
                                data.isExcused = !data.isExcused
                            }}/>
                        </div>
                        <select key={data.tAttendanceID} className="rounded-md border-2 border-fim mr-24"
                                defaultValue={data.absencetype ? data.absencetype.toString() : ""}
                                onChange={(e) => {
                                    data.tAbsenceTypeID = e.target.selectedIndex + 1
                                }}>
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
                            className="w-28 h-12 ml-auto mr-1.5 rounded-md px-2 py-1.5 text-sm font-semibold shadow-md border-2 border-black hover:text-fim hover:border-fim hover:shadow-inner"
                            onClick={handleSubmit}>
                        SAVE
                        <SaveOutlinedIcon sx={{ml: 0.5}}/>
                    </button>
                    <button type="button"
                            className="w-28 h-12 ml-1.5 mr-auto rounded-md px-2 py-1.5 text-sm font-semibold shadow-md border-2 border-black hover:text-fim hover:border-fim hover:shadow-inner"
                            onClick={() => exportToExcel(attendanceData)}>
                        EXPORT
                        <FileDownloadOutlinedIcon sx={{ml: 0.5}}/>
                    </button>
                </div>
            </form>
        </>
    )
}