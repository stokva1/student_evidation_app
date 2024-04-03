import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import getAllSubjects from "@/app/actions/getAllSubjects";
import getSubjectStudents from "@/app/actions/getSubjectStudents";
import Papa from 'papaparse';
import getScheduleActionType from "@/app/actions/getScheduleActionType";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';





const ScheduleActionSchema = Yup.object().shape({
    date: Yup.date().required("Date is required"),
    subjectId: Yup.number().required("Subject is required"),
    scheduleActionTypeId: Yup.number().required("Schedule Action Type is required"),
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

    const handleSubmit = (values, {setSubmitting}) => {
        setSubmitting(false);
        handleClose();
    };

    useEffect(() => {
        getActionTypesAndSubjects().catch()
    }, [])

    const getActionTypesAndSubjects = async () => {
        const allTypes = await getScheduleActionType()
        setTypes(allTypes)
        const allSubjects = await getAllSubjects()
        setSubjects(allSubjects)
        console.log(allSubjects)
    }

    const handleTypeChange = (e) => {
        setType(e.target.value);
    }

    const handleSubjectChange = (e) => {
        setSubjectID(e.target.value);
    }

    const handleFileUpload = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (fileExtension === "csv"){
                const reader = new FileReader();

                reader.onload = function(e) {
                    const csvData = e.target.result;
                    Papa.parse(csvData, {
                        delimiter: ";",
                        encoding: "windows-1250",
                        header: true,
                        complete: function(results) {
                            const names = results.data.map(row => ({
                                name: row.prijmeni + " " + row.jmeno,
                            }));
                            setStudents(names);
                        },
                        skipEmptyLines: true,
                    });
                };

                reader.onerror = function(e) {
                    console.error("File could not be read! Code " + e.target.error);
                };

                reader.readAsText(e.target.files[0], "windows-1250");
            }else {
                alert("Please upload a CSV file.");
            }
        } else {
            console.log("No file selected.");
        }
    };

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
                <form
                    // initialValues={{
                    //     date: "",
                    //     subjectId: "",
                    //     scheduleActionTypeId: "",
                    // }}
                    // validationSchema={ScheduleActionSchema}
                    onSubmit={() => (handleSubmit)}
                >

                    <DialogContent>
                        <div className="flex flex-col space-y-5">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} size="small">
                                    <DateTimePicker label="Vyberte datum" sx={{width: "100%"}} ampm={false}/>
                                </DemoContainer>
                            </LocalizationProvider>
                            <Select onChange={handleTypeChange} value={type}>
                                <MenuItem value={""}>-</MenuItem>
                                {types.map((type) => (
                                    <MenuItem key={type.tScheduleActionType} value={type.tScheduleActionType}>{type.type}</MenuItem>
                                ))}
                            </Select>
                            <Select onChange={handleSubjectChange} value={subjectID}>
                                <MenuItem value={""}>-</MenuItem>
                                {subjects.map((subject) => (
                                    <MenuItem key={subject.tSubjectID} value={subject.tSubjectID}>{subject.tsubject.name}</MenuItem>
                                ))}
                            </Select>
                            <input type="file" id="csvFile" accept=".csv" onChange={(e) => {
                                handleFileUpload(e)
                            }}/>
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
