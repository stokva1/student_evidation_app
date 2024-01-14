"use client"
import UserInfo from "@/components/userInfo";
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Drawer from "@/components/drawer";
import Navbar from "@/components/navbar";

export default function Home() {
    const router = useRouter();
    const {data: session} = useSession();

    if (session === undefined || session === null) {
        router.push('/');
        return '';
    } else {
        return (
            <main className="h-screen">
                <Navbar/>

                    {/*<Drawer/>*/}
                    {/*<UserInfo/>*/}
            </main>
    );
    }
    }
