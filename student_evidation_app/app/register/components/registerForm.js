"use client"
import {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useFormik} from "formik";
import * as Yup from "yup";
import registerUser from "@/app/actions/registerUser";
import isToken from "@/app/actions/isToken";

const RegisterSchema = Yup.object({
    firstname: Yup.string().required("Jméno je povinný údaj"),
    surname: Yup.string().required("Příjmení je povinný údaj"),
    password: Yup.string()
        .required("Heslo je povinný údaj")
        .min(6, "Heslo musí být alespoň 6 znaků dlouhé")
        .max(60, "Heslo je příliš dlouhé"),
    confirmPassword: Yup.string()
        .required("Potvrzení hesla je povinné")
        .oneOf([Yup.ref('password'), null], "Hesla se neshodují"),
})

export default function RegisterForm({token}) {
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async () => {
        if (formik.values.password !== formik.values.confirmPassword) {
            setError("Hesla se neshodují")
            return
        }

        try {
            const tokenObject = await isToken(token)

            await registerUser(formik.values.firstname, formik.values.surname, formik.values.password, tokenObject)

            const res = await signIn('credentials', {
                email: tokenObject.email,
                password: formik.values.password,
                redirect: false,
            })

            if (res.error) {
                console.log(res.error)
                setError("Neplatné údaje")
                return
            }
            if (res.ok && !res.error) {
                router.push("/home")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const formik = useFormik({
        initialValues: {
            firstname: "",
            surname: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: RegisterSchema,
        onSubmit: handleSubmit,
    })

    return (
        <>
            <div
                className="absolute bg-white border-2 border-fim drop-shadow-lg rounded-lg flex flex-1 flex-col justify-center px-6 py-10 sm:px-12 sm:border-0">
                <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">
                    Vytvořte si účet
                </h2>
                <div className="mt-10">
                    <form className="space-y-6" action="student_evidation_app/app/home/components#" method="POST"
                          onSubmit={formik.handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium leading-4 text-gray-900">
                                Jméno
                            </label>
                            <div className="mt-2">
                                <input
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fim sm:text-sm sm:leading-6"
                                    {...formik.getFieldProps('firstname')}
                                />
                                {formik.touched.firstname && formik.errors.firstname ? (
                                    <div className="text-red-500 text-xs mt-1">
                                        {formik.errors.firstname}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-4 text-gray-900">
                                Příjmení
                            </label>
                            <div className="mt-2">
                                <input
                                    id="surname"
                                    name="surname"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fim sm:text-sm sm:leading-6"
                                    {...formik.getFieldProps('surname')}
                                />
                                {formik.touched.surname && formik.errors.surname ? (
                                    <div className="text-red-500 text-xs mt-1">
                                        {formik.errors.surname}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        {token ? (
                            <>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
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
                                            onChange={() => {
                                                setError("")
                                            }}
                                            {...formik.getFieldProps("password")}
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="text-red-500 text-xs mt-1">
                                                {formik.errors.password}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Znovu heslo
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fim sm:text-sm sm:leading-6"
                                            onChange={() => {
                                                setError("")
                                            }}
                                            {...formik.getFieldProps("confirmPassword")}
                                        />
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                            <div className="text-red-500 text-xs mt-1">
                                                {formik.errors.confirmPassword}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                        <div className="pt-3">
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-fim px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-fim hover:bg-white hover:outline hover:outline-2 hover:border-fim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out delay-100"
                            >
                                Registrovat
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
            </div>
        </>
    )
}