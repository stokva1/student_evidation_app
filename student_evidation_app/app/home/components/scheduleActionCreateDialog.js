import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button, Input,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import getAllSubjects from "@/app/actions/getAllSubjects";
import getSubjectStudents from "@/app/actions/getSubjectStudents";
import Papa from 'papaparse';
import getScheduleActionType from "@/app/actions/getScheduleActionType";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import createScheduleAction from "@/app/actions/createScheduleAction";
import {Formik, Form, useFormik} from "formik";
import dayjs from "dayjs";
import CloseIcon from '@mui/icons-material/Close';
import {SubjectAddDialog} from "@/app/home/components/subjectForm";

const ScheduleActionSchema = Yup.object({
    subjectID: Yup.number().required("Subject is required"),
    typeID: Yup.number().required("Schedule Action Type is required"),
    date: Yup.date().required("Date is required"),
    students: Yup.array().required("Students are required").test('notEmpty', 'Students are required', (value) => value && value.length > 0),

});


export function ScheduleActionCreateDialog({onScheduleActionAdded}) {
    const [opened, setOpened] = useState(false)
    const [subjects, setSubjects] = useState([])
    const [types, setTypes] = useState([])

    const handleClose = () => {
        setOpened(false);
    };

    useEffect(() => {
        getActionTypesAndSubjects().catch()
    }, [])

    const getSubjects = async () => {
        const allSubjects = await getAllSubjects()
        setSubjects(allSubjects)
    }

    const getActionTypesAndSubjects = async () => {
        const allTypes = await getScheduleActionType()
        setTypes(allTypes)
        const allSubjects = await getAllSubjects()
        setSubjects(allSubjects)
    }

    const handleFileUpload = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (fileExtension === "csv") {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const csvData = e.target.result;
                    Papa.parse(csvData, {
                        delimiter: ";",
                        encoding: "windows-1250",
                        header: true,
                        complete: function (results) {
                            const names = results.data.map(row => ({
                                surname: row.prijmeni,
                                firstname: row.jmeno,
                                personalNum: row.osCislo
                            }));
                            formik.setFieldValue("students", names)
                        },
                        skipEmptyLines: true,
                    });
                };

                reader.onerror = function (e) {
                    console.error("File could not be read! Code " + e.target.error);
                };

                reader.readAsText(e.target.files[0], "windows-1250");
            } else {
                alert("Please upload a CSV file.");
            }
        } else {
            console.log("No file selected.");
        }
    };

    const formik = useFormik({
        initialValues: {
            subjectID: "",
            typeID: "",
            date: new Date(),
            students: "",
        },
        validationSchema: ScheduleActionSchema,
        onSubmit: async (values) => {
            try {
                await createScheduleAction(values.date, values.typeID, values.subjectID, values.students)
                formik.resetForm()
                handleClose()
                onScheduleActionAdded()
            } catch (e) {
                console.error(e)
            }
        },
    });

    return (
        <>
            <div className="flex justify-center">
                <button className="text-white hover:text-blue-500 hover:bg-white rounded-md size-10"
                        onClick={() => setOpened(true)}>
                    <AddIcon/>
                </button>
            </div>
            <Dialog sx={{textAlign: "center"}} open={opened} onClose={handleClose}>
                <DialogTitle className="font-bold text-gray-900">Vytvořit akci</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    className="size-12"
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[900],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <form onSubmit={formik.handleSubmit} className="p-2">
                    <DialogContent>
                        <div className="flex flex-col space-y-5">
                            <div className="flex flex-row justify-between">
                                <div className="size-8"></div>
                                <div className="font-semibold text-gray-900 mt-0">Předmět</div>
                                <SubjectAddDialog onSubjectAdded={getSubjects}/>
                            </div>
                            <Select id="subjectID" name="subjectID" onChange={formik.handleChange}
                                    className="bg-gray-100 rounded-full text-blue-500 h-12"
                                    value={formik.values.subjectID}
                                    error={formik.touched.subjectID && Boolean(formik.errors.subjectID)}
                            >
                                <MenuItem value={""} className="text-blue-500">-</MenuItem>
                                {subjects.map((subject) => (
                                    <MenuItem key={subject.tSubjectID} value={subject.tSubjectID}
                                              className="text-blue-500">
                                        {subject.tsubject.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <div className="font-semibold text-gray-900">Druh akce</div>
                            <Select id="typeID" name="typeID" onChange={formik.handleChange}
                                    className="bg-gray-100 rounded-full text-blue-500 h-12"
                                    value={formik.values.typeID}
                                    error={formik.touched.typeID && Boolean(formik.errors.typeID)}>
                                <MenuItem value={""}>-</MenuItem>
                                {types.map((type) => (
                                    <MenuItem key={type.tScheduleActionType} value={type.tScheduleActionType}>
                                        {type.type}
                                    </MenuItem>
                                ))}
                            </Select>
                            <div className="font-semibold text-gray-900">Datum</div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} size="small">
                                    <DateTimePicker id="date" name="date" onChange={(value) => {
                                        formik.setFieldValue('date', new Date(value));
                                    }}
                                                    className="bg-gray-100"
                                                    value={formik.values.date ? dayjs(formik.values.date) : null}
                                                    sx={{width: "100%"}} ampm={false}/>
                                </DemoContainer>
                            </LocalizationProvider>
                            <div className="font-semibold text-gray-900">Seznam studentů</div>
                            <input id="students" name="students" label="students" type="file" accept=".csv"
                                   className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white"
                                   onChange={handleFileUpload}
                                   required={formik.touched.students && Boolean(formik.errors.students)}/>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" className="rounded-lg bg-blue-500 text-white w-24">
                            Vytvořit
                        </Button>
                        <Button onClick={handleClose}
                                className="rounded-lg text-red-600 outline outline-1 outline-red-600 w-24">Zrušit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    );
}
