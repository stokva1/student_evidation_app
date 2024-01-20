"use client"

export function AttendanceCard({attendance}) {
    function changeAttendance (card){
        // let x = document.getElementById("attendance")

        if (card.style.backgroundColor === "rgb(34, 197, 94)") {
            card.style.backgroundColor = "rgb(220, 38, 38)"
            card.innerHTML = "N"
        } else if (card.style.backgroundColor === "rgb(220, 38, 38)") {
            card.style.backgroundColor = "rgb(34, 197, 94)"
            card.innerHTML = "P"
        } else if (card.classList.contains("bg-green-400")){
            card.style.backgroundColor = "rgb(220, 38, 38)"
            card.innerHTML = "N"
        } else if (card.classList.contains("bg-red-600")){
            card.style.backgroundColor = "rgb(34, 197, 94)"
            card.innerHTML = "P"
        }
    }

    return (
        <>
            {attendance.map((data, i) => (
                <div key={i} className="h-16 flex flex-row divide-x space-x-5 px-5 py-2">
                    <div className="my-auto w-48">{data.surname} {data.firstname}</div>
                    {!data.isPresent && <button id="attendance" className="bg-green-400 w-14 py-2.5 text-center align-text-bottom rounded-lg" onClick={(e) => changeAttendance(e.target)}>P</button>}
                    {data.isPresent && <button id="attendance" className="bg-red-600 w-14 py-2.5 text-center align-text-bottom rounded-lg" onClick={(e) => changeAttendance(e.target)}>N</button>}

                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            ))}
        </>
    )
}