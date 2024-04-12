import Navbar from "@/app/home/components/navbar";
import HomeContent from "@/app/home/components/homeContent";

export default async function Home() {
    return (
        <main className="h-screen flex flex-col">
            <Navbar/>
            <HomeContent/>
        </main>
    )
}



