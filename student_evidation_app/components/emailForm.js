"use client"

import {useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useFormik} from "formik";
import * as Yup from "yup";
import createToken from "@/app/actions/createToken";
import getUserByEmail from "@/app/actions/getUserByEmail";


const EmailSchema = Yup.object({
    email: Yup.string()
        .required('Email je povinný údaj')
        .email('Špatný formát emailu'),
});

export default function EmailForm({userExist, emailValue}) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async () => {
        try {
            const user = await getUserByEmail(formik.values.email)

            if (user) {
                if (!user.password) {
                    const isValid = await createToken(formik.values.email, window.location.origin)
                    
                    if (isValid){
                        setError("Zkontrolujte email, pro dokončení registrace.");
                    } else {
                        setError("Něco se pokazilo :(")
                    }

                } else if (user.password) {
                    userExist(true)
                }
            } else {
                setError("Email není v databzi učitelů.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: EmailSchema,
        onSubmit: (values) => {
            handleSubmit(values).catch()
            emailValue(values.email)
        },
    });

    return (
        <div
            className="absolute bg-white border-2 border-fim drop-shadow-lg rounded-lg flex flex-1 flex-col justify-center px-6 py-10 sm:px-12 sm:border-0">
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">
                Zadejte email
            </h2>
            <div className="mt-10">
                <form className="space-y-6" action="student_evidation_app/app/home/components#" method="POST" onSubmit={formik.handleSubmit}>
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
                    <div className="pt-3">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-fim px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-fim hover:bg-white hover:outline hover:outline-2 hover:border-fim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out delay-100"
                        >
                            Přihlásit/Registrovat
                        </button>
                        {error && (
                            <div
                                className="flex bg-red-500 text-white w-full justify-center rounded-b-lg text-sm font-semibold leading-6 text-white text-wrap">
                                {error}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>)
}