import {useState} from "react";

export default function PresenceCard({isPresent, onClick}) {

    const [presence, setPresence] = useState(isPresent)

    return (
        <button
            id="attendance"
            type="button"
            className={(presence ? "bg-green-600" : "bg-red-600") + " w-14 py-3 text-center align-text-bottom rounded-lg"}
            onClick={() => {
                setPresence(!presence)
                onClick()
            }}
        >{presence ? "P" : "N"}</button>
    )
}