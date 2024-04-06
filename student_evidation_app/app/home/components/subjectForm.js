import addSubject from "@/app/actions/addSubject";
import * as Yup from "yup";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import React, {useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import {useFormik} from "formik";

const SubjectSchema = Yup.object({
    subjectName: Yup.string().required("Subject is required"),
})

export function subjectForm(open, subjectOpened) {
    const [opened, setOpened] = useState(open);
    const [subjectOpen, setSubjectOpen] = useState(subjectOpened)

    const handleClose = () => {
        setOpened(false);
    };

    const formik = useFormik({
        initialValues: {
            subjectName: "",
        },
        validationSchema: SubjectSchema,
        onSubmit: async (values) => {
            try {
                await addSubject(values.subjectName)
            } catch (e) {
                console.log(e)
            }
        },
    });

    return (
        <Dialog sx={{textAlign: "center"}} open={opened} onClose={handleClose}>
            <DialogTitle className="font-bold text-gray-900">Přidat předmět</DialogTitle>
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
                            <button type="button"
                                    className={(subjectOpen ? "rotate-45" : "") + " text-white bg-blue-500 hover:text-blue-500 hover:bg-white rounded-full size-8 pb-0.5 transition ease-in-out delay-50"}
                                    onClick={() => {
                                        setSubjectOpen(!subjectOpen)
                                    }}>
                                <AddIcon/>
                            </button>
                        </div>
                        <input id="subjectName" name="subjectName" className="bg-gray-100 rounded-full text-blue-500 w-full h-12 px-4"
                               onChange={formik.handleChange}
                               required={formik.touched.subjectName && Boolean(formik.errors.subjectName)}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" className="rounded-lg bg-blue-500 text-white w-24">
                        Přídat
                    </Button>
                    <Button onClick={handleClose}
                            className="rounded-lg text-red-600 outline outline-1 outline-red-600 w-24">Zrušit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>

    )
}