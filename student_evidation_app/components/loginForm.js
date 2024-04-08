"use client"

import {useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {LoginSchema} from "../schemas/loginSchema";
import {useFormik} from "formik";


export default function LoginForm(defaultEmail) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    //TODO do smth with this useEffect, because session?.status is always 'authenticated'


    // useEffect(() => {   //react hook, který se spustí, když se změní některá ze závislostí
    //     if (session?.status === 'authenticated'){
    //         router.push("/home");
    //     }
    //     console.log(session)
    // }, [session?.status, router])

    const handleSubmit = async () => {
        try {
            const res = await signIn('credentials', {
                email: formik.values.email,
                password: formik.values.password,
                redirect: false,
            });

            if (res.error) {
                console.log(res.error)
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
        initialValues: {
            email: defaultEmail.defaultEmail || "",
            password: ""
        },
        validationSchema: LoginSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div className="absolute bg-white border-2 border-fim drop-shadow-lg rounded-lg flex flex-1 flex-col justify-center px-6 py-10 sm:px-12 sm:border-0">
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">
                Přihlášení
            </h2>
            <div className="mt-10">
                <form className="space-y-6" action="#" method="POST" onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-4 text-gray-900">
                            Email
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
                                Heslo
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
                    <div className="pt-3">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-fim px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-fim hover:bg-white hover:outline hover:outline-2 hover:border-fim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out delay-100"
                        >
                            Přihlásit
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