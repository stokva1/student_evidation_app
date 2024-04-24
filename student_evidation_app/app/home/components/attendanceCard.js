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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as Yup from 'yup';

const attendanceSchema = Yup.object({
    tAttendanceID: Yup.number().required("Attendance ID je povinné"),
    isPresent: Yup.boolean().required("Docházka je povinná"),
    isExcused: Yup.boolean().required("Omluvenost je povinná"),
    tAbsenceTypeID: Yup.number().nullable()
})

export function AttendanceCard({attendance, onClick}) {
    const [open, setOpen] = useState(false)
    const [enable, toggleEnable] = useState(false)
    const [update, toggleUpdate] = useState(false)
    const [order, setOrder] = useState("asc")
    const [orderBy, setOrderBy] = useState("surname")
    const [errorMessage, setErrorMessage] = useState("")

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
        e.preventDefault();

        try {
            const validatedAttendance = await Promise.all(attendance.map(async (data) => {
                try {
                    const validatedData = await attendanceSchema.validate(data)
                    return validatedData;
                } catch (error) {
                    setErrorMessage(error.message)
                    throw error;
                }
            }));

            await Promise.all(validatedAttendance.map(async (data) => {
                await updateAttendance({
                    attendanceID: data.tAttendanceID,
                    isPresent: data.isPresent,
                    isExcused: data.isExcused,
                    absencetypeID: data.tAbsenceTypeID,
                });
            }));

            setOpen(true);
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {id: 'name', label: 'Jméno', minWidth: 'min-content', align: 'left'},
        {id: 'present', label: 'Přítomen', minWidth: 'min-content', align: 'center'},
        {id: 'excused', label: 'Omluven', minWidth: 'min-content', align: 'center'},
        {id: 'absenceType', label: 'Typ absence', minWidth: 'min-content', align: 'center'},
    ]

    const sortArray = () => {
        if (order === "asc") {
            attendance.sort((a, b) => {
                if (orderBy === 'name') {
                    return a.surname.localeCompare(b.surname);
                } else if (orderBy === 'present') {
                    return a.isPresent - b.isPresent;
                } else if (orderBy === 'excused') {
                    return a.isExcused - b.isExcused;
                } else if (orderBy === 'absenceType') {
                    return a.tAbsenceTypeID - b.tAbsenceTypeID;
                }
                return 0;
            });
        } else {
            attendance.sort((a, b) => {
                if (orderBy === 'name') {
                    return b.surname.localeCompare(a.surname);
                } else if (orderBy === 'present') {
                    return b.isPresent - a.isPresent;
                } else if (orderBy === 'excused') {
                    return b.isExcused - a.isExcused;
                } else if (orderBy === 'absenceType') {
                    return b.tAbsenceTypeID - a.tAbsenceTypeID;
                }
                return 0;
            });
        }
    }

    useEffect(() => {
        sortArray()
        toggleUpdate(!update)
    }, [orderBy, order]);

    return (
        <form className="divide-y px-6" onSubmit={handleSubmit}>
            <TableContainer className="flex outline outline-1 outline-blue-500 overflow-y-scroll rounded-md"
                            sx={{height: 'calc(100vh - 300px)'}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                    className="bg-blue-500"
                                    sx={{fontWeight: 900, pl: 3, fontSize: '1rem', color: "white"}}
                                >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOrderBy(column.id)
                                            if (order === "asc") {
                                                setOrder("desc")
                                            } else {
                                                setOrder("asc")
                                            }
                                        }}
                                    >
                                        {column.label}
                                    </button>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{px: 10}}>
                        {attendance.map((data) => (
                            <TableRow hover role="checkbox" key={data.tAttendanceID}>
                                <TableCell sx={{pl: 3, fontWeight: 500, fontSize: '0.9rem'}}>
                                    {data.surname + ' ' + data.firstname}</TableCell>
                                <TableCell sx={{padding: '4px 4px 4px 13px'}} align={"center"}>
                                    <PresenceCard key={data.tAttendanceID} isPresent={data.isPresent} onClick={() => {
                                        data.isPresent = !data.isPresent
                                        toggleEnable(!enable)
                                        if (data.isPresent === true) {
                                            data.isExcused = false
                                            data.tAbsenceTypeID = null
                                        }
                                    }}/>
                                </TableCell>
                                <TableCell sx={{padding: '0 0 0 13px'}} align={"center"}>
                                    <Checkbox checked={data.isExcused}
                                              disabled={data.isPresent}
                                              onChange={(e) => {
                                                  data.isExcused = !data.isExcused
                                                  toggleEnable(!enable)
                                                  if (data.isExcused === false) {
                                                      data.tAbsenceTypeID = null
                                                  }
                                              }}/>
                                </TableCell>
                                <TableCell sx={{padding: '0 0 0 13px'}} align={"center"}>
                                    <select key={data.tAttendanceID}
                                            className="rounded-md border-2 border-blue-500 h-8"
                                            value={data.tAbsenceTypeID || 0}
                                            disabled={!data.isExcused}
                                            onInput={(e) => {
                                                data.tAbsenceTypeID = e.target.selectedIndex + 1
                                                toggleEnable(!enable)
                                            }}>
                                        <option value={0} disabled>-</option>
                                        <option value={1}>Nemoc</option>
                                        <option value={2}>Rodinné důvody</option>
                                        <option value={3}>Problém s dopravou</option>
                                        <option value={4}>Zaspání</option>
                                        <option value={5}>Školní akce</option>
                                        <option value={6}>Jiné</option>
                                    </select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Snackbar open={open && errorMessage === ''} onClose={() => setOpen(false)} TransitionComponent={Grow}
                          autoHideDuration={1200}>
                    <Alert severity="success" variant="filled" sx={{width: '100%'}}>
                        Data byla úspěšně uložena!
                    </Alert>
                </Snackbar>
                <Snackbar open={errorMessage !== ''} onClose={() => setErrorMessage('')} TransitionComponent={Grow}
                          autoHideDuration={6000}>
                    <Alert severity="error" variant="filled" sx={{width: '100%'}}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </TableContainer>
            <div className="w-full flex justify-center space-x-2 py-4">
                <button type="submit"
                        onClick={onClick}
                        className="w-28 h-12 bg-blue-500 rounded-md px-2 py-1.5 text-white text-sm font-semibold shadow-md hover:bg-white hover:text-gray-900 hover:border-gray-900 hover:outline hover:outline-1 hover:outline-gray-900 hover:shadow-inner transition ease-in-out delay-50"
                >
                    SAVE
                    <SaveOutlinedIcon sx={{ml: 0.5}}/>
                </button>
                <button type="button"
                        className="w-28 h-12 rounded-md px-2 py-1.5 text-sm font-semibold shadow-md outline outline-1 outline-black hover:bg-blue-500 hover:text-white hover:outline-0 hover:shadow-inner transition ease-in-out delay-50"
                        onClick={() => exportToExcel(attendanceData)}>
                    EXPORT
                    <FileDownloadOutlinedIcon sx={{ml: 0.5}}/>
                </button>
            </div>
        </form>
    )
}