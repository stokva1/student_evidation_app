import Navbar from "@/app/home/components/navbar";
import getScheduleActions from "@/app/actions/getScheduleActions";
import HomeContent from "@/app/home/components/homeContent";

export default async function Home() {
    const scheduleActions = await getScheduleActions()

    return (
        <main className="h-screen flex flex-col">
            <Navbar/>
            <HomeContent
                scheduleActions={scheduleActions}
            />
            {/*<UserInfo/>*/}
        </main>
    );
}


// const handleCallback = (scheduleActionID) => {
//     const id = scheduleActionID
//     return id
// }
// let attendance
// const onClick = async (id) => {
//     attendance = await getAttendance(id)
//     return attendance
// }
// <div className="pt-16 flex flex-row">
//     <div className="h-screen w-5/12 flex flex-col border-r-4">
//         <div className="bg-white float-start w-full h-32">
//             <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//                 Rozvrhové akce
//             </h2>
//         </div>
//         <div className="my-3 mx-12 h-full">
//             <div className="py-8 px-12 overflow-y-scroll h-full bg-sky-300 rounded-md space-y-6">
//                 <ScheduleActionCard
//                     scheduleActions={scheduleActions}
//                     onClick={onClick}
//                     scheduleActionID={handleCallback}
//                 />
//             </div>
//         </div>
//     </div>
//     <div className="bg-white float-start w-full h-32">
//         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//             Docházka
//         </h2>
//         <div className="divide-y mt-12">
//             <AttendanceCard attendance={attendance}/>
//         </div>
//     </div>
// </div>

