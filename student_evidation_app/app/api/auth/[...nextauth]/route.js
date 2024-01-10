import NextAuth, {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials:{
                email: {label: "email", type: "text"},
                password: {label: "password", type: "password"},
            },

            async authorize(credentials){
                //kontrola, zda nechybí email nebo heslo
                if (!credentials?.email || !credentials?.password){
                    throw new Error("Invalid Credentials");
                }
                const user = {id: "1"};
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }