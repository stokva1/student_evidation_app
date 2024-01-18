import NextAuth, {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt, {compare} from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "email", type: "text"},
                password: {label: "password", type: "password"},
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) { //kontrola, zda nechybí email nebo heslo
                    throw new Error("Missing email or password");
                }

                const user = await prisma.tlogin.findUnique({
                    where: {
                        email: credentials.email
                    }
                });


                if (!user || !(await compare(credentials.password, user.password))) {
                    throw new Error("Invalid email or password") //kontrola správných přihlašovacích údajů
                }

                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/",
    },
    // debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};