"use client"

import {useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {LoginSchema} from "../schemas/loginSchema";
import {useFormik} from "formik";


const initialValues = {
    email: "",
    password: ""
};

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const session = useSession();


    useEffect(() => {   //react hook, který se spustí, když se změní některá ze závislostí
        if (session?.status === 'authenticated'){
            router.push("/home");
        }
    }, [session?.status, router])

    const handleSubmit = async (e) => {
        // e.preventDefault();     //zabránění aktuaizace stránky
        try {
            const res = await signIn('credentials', {
                email: e.email,
                password: e.password,
                redirect: false,
            });

            if (res.error) {
                setError("Invalid Credentials");
                return;
            }
            if (res.ok && !res.error) {
                router.push("/home");
            }
        } catch (error) {
            console.log(error)
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST" onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fim sm:text-sm sm:leading-6"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                {...formik.getFieldProps('email')}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fim sm:text-sm sm:leading-6"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                {...formik.getFieldProps('password')}

                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-fim px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-fim hover:bg-white hover:border-2 hover:border-fim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out delay-100 hover:scale-105"
                        >
                            Sign in
                        </button>
                        {error && (
                            <div
                                className="flex bg-red-500 text-white w-full justify-center rounded-b-lg text-sm font-semibold leading-6 text-white">
                                {error}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>)
}