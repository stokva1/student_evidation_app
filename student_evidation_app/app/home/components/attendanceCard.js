"use client"

export function AttendanceCard({attendance}) {
    function changeAttendance() {
        let x = document.getElementById("attendance")
        if (x.style.backgroundColor === "rgb(220, 38, 38)") {
            x.style.backgroundColor = "rgb(34, 197, 94)"
        } else {
            x.style.backgroundColor = "rgb(220, 38, 38)"
        }
    }

    return (
        <>
            {attendance.map(data => (
                <div className="h-16 flex flex-row divide-x space-x-5">
                    <div className="my-auto">Jméno</div>
                    <div id="attendance" className="bg-red-600" onClick={changeAttendance}>P</div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            ))}
        </>
    )
}