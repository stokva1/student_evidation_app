"use client"
import UserInfo from "@/components/userInfo";
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const {data: session} = useSession();

    if (session === undefined || session === null) {
        router.push('/');
        return '';
    }else{
        return (
            <UserInfo/>
        );
    }
}
