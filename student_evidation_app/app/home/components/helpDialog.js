import React, {useState} from "react";
import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import helpImage1 from "@/images/helpImage1.png";
import helpImage2 from "@/images/helpImage2.png";
import Image from "next/image";

export default function HelpDialog() {
    const [opened, setOpened] = useState(false)

    const handleClose = () => {
        setOpened(false)
    }

    return (
        <>
            <button type="button"
                    className="text-blue-500 bg-blue-white hover:scale-110 hover:bg-white rounded-full size-8 pb-0.5 transition ease-in-out delay-50"
                    onClick={() => {
                        setOpened(!opened)
                    }}>
                <HelpOutlineIcon/>
            </button>
            <Dialog sx={{textAlign: "center"}} open={opened} onClose={handleClose} fullWidth={true} maxWidth={"lg"}>
                <DialogTitle className="font-bold text-gray-900">Jak získat seznam studentů</DialogTitle>
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
                <DialogContent>
                    <div className="text-center text-2xl font-bold text-blue-500">1.</div>
                    <Image className="object-cover"
                           src={helpImage1}
                           quality={50}
                           placeholder={"blur"}
                           alt="první obrázek návodu"/>
                    <div className="text-center text-2xl font-bold text-blue-500 mt-5">2.</div>
                    <Image className="min-w-screen"
                           src={helpImage2}
                           quality={50}
                           placeholder={"blur"}
                           alt="druhý obrázek návodu"/>
                </DialogContent>
            </Dialog>
        </>
    )
}