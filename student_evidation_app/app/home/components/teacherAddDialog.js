import addTeacher from "@/app/actions/addTeacher";
import * as Yup from "yup";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import React, {useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import {useFormik} from "formik";

const TeacherSchema = Yup.object({
    email: Yup.string()
        .required("Email je povinný údaj")
        .email("Špatný formát emailu"),
})

export function TeacherAddDialog() {
    const [opened, setOpened] = useState(false)

    const handleClose = () => {
        setOpened(false)
    }

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: TeacherSchema,
        onSubmit: async (values) => {
            try {
                await addTeacher(values.email)
                formik.resetForm()
                handleClose()
            } catch (error) {
                console.log(error)
            }
        },
    })

    return (
        <>
            <button type="button"
                    className={(opened ? "rotate-45" : "") + " text-white bg-blue-500 hover:text-blue-500 hover:bg-white rounded-full size-8 pb-0.5 transition ease-in-out delay-50"}
                    onClick={() => {
                        setOpened(!opened)
                    }}>
                <AddIcon/>
            </button>
            <Dialog sx={{textAlign: "center"}} open={opened} onClose={handleClose}>
                <DialogTitle className="font-bold text-gray-900">Přidat vyučujícího</DialogTitle>
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
                            <div className="font-semibold text-gray-900 mt-0">Email</div>
                            <input id="email" name="email"
                                   className="bg-gray-100 rounded-full text-blue-500 w-full h-12 px-4"
                                   onChange={formik.handleChange}
                                   required={formik.touched.email && Boolean(formik.errors.email)}/>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" className="rounded-lg bg-blue-500 text-white w-24">
                            Přídat
                        </Button>
                        <Button
                            onClick={handleClose}
                            className="rounded-lg text-red-600 outline outline-1 outline-red-600 w-24">Zrušit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}