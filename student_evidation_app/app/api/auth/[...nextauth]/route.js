import NextAuth, {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import {compare} from "bcrypt";

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

                const perm = await prisma.tteacher.findUnique({
                    where: {
                        tLoginID: user.tLoginID
                    }
                });

                if (perm && perm.tLoginID) {
                    user.id = perm.tTeacherID;
                    user.firstname = perm.firstname;
                    user.surname = perm.surname;
                }
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user?.id) {
                token.id = user.id;
                token.firstname = user.firstname;
                token.surname = user.surname;
                token.email = user.email;
            }
            return token;
        },
        async session({session, token}) {
            if (session.user) {
                session.user.id = token.id;
                session.user.firstsname = token.firstname;
                session.user.surname = token.surname;
                session.user.email = token.email;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/",
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};