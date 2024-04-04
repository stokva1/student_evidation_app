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

const ScheduleActionSchema = Yup.object({
    date: Yup.date().required("Date is required"),
    typeID: Yup.number().required("Schedule Action Type is required"),
    subjectID: Yup.number().required("Subject is required"),
    students: Yup.array().required("Students are required").test('notEmpty', 'Students are required', (value) => value && value.length > 0),

});

export function ScheduleActionCreateDialog() {
    const [opened, setOpened] = useState(false);
    const [subjects, setSubjects] = useState([])
    const [subjectID, setSubjectID] = useState('')
    const [students, setStudents] = useState([])
    const [types, setTypes] = useState([])
    const [type, setType] = useState([])

    const handleClose = () => {
        setOpened(false);
    };

    useEffect(() => {
        getActionTypesAndSubjects().catch()
    }, [])

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
            date: new Date(),
            typeID: "",
            subjectID: "",
            students: "",
        },
        validationSchema: ScheduleActionSchema,
        onSubmit: async (values) => {
            // console.log(values.students)
            console.log("boy")
            try {
                console.log(values)
                await createScheduleAction(values.date, values.typeID, values.subjectID, values.students)
                formik.resetForm()
                handleClose()
            } catch (error) {
                console.error(error)
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
                <DialogTitle>Vytvořit akci</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                />
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <div className="flex flex-col space-y-5">
                            <div>Datum</div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} size="small">
                                    <DateTimePicker id="date" name="date" label="Vyberte datum" onChange={(value) => {
                                        formik.setFieldValue('date', new Date(value));
                                    }}
                                                    value={formik.values.date ? dayjs(formik.values.date) : null}
                                                    sx={{width: "100%"}} ampm={false}/>
                                </DemoContainer>
                            </LocalizationProvider>
                            <div>Předmět</div>
                            <Select id="subjectID" name="subjectID" onChange={formik.handleChange}
                                    value={formik.values.subjectID} error={formik.touched.subjectID && Boolean(formik.errors.subjectID)}
                            >
                                <MenuItem value={""}>-</MenuItem>
                                {subjects.map((subject) => (
                                    <MenuItem key={subject.tSubjectID} value={subject.tSubjectID}>
                                        {subject.tsubject.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <div>Druh akce</div>
                            <Select id="typeID" name="typeID" onChange={formik.handleChange}
                                    value={formik.values.typeID} error={formik.touched.typeID && Boolean(formik.errors.typeID)}>
                                <MenuItem value={""}>-</MenuItem>
                                {types.map((type) => (
                                    <MenuItem key={type.tScheduleActionType} value={type.tScheduleActionType}>
                                        {type.type}
                                    </MenuItem>
                                ))}
                            </Select>
                            <div>Seznam studentů</div>
                            <Input id="students" name="students" label="students" type="file" accept=".csv"
                                   onChange={handleFileUpload}
                                   error={formik.touched.students && Boolean(formik.errors.students)}/>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Zrušit</Button>
                        <Button type="submit">
                            Vytvořit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
