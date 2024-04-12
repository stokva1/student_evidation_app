"use server"
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer"
import {addMinutes} from "date-fns";

const text = (email, token, host) => {
    const confirmUrl = `${host}/register?token=${token}`
    return `Dobrý den,
Prosím ověřte svoji adresu pomocí tohoto odkazu. (POZOR! Odkaz je validní poze po dobu 30 minut)
<a href="${confirmUrl}">Ověři adresu</a>`
}

const getProvider = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD
        }
    });
}

async function createToken(email, host) {
    try {
        const token = crypto.randomUUID();
        const expiresAt = addMinutes(new Date(), 30)

        await prisma.ttoken.upsert({
            where: {email: email},
            update: {token, expiresAt},
            create: {email, token, expiresAt},
        });

        const transport = getProvider()
        const result = await transport.sendMail({
            to: email,
            from: process.env.EMAIL_FROM,
            subject: `Sign in to ${host}`,
            text: text(email, token, host),
        })

        if (result.rejected.length === 0) {
            return true
        }

    } catch (e) {
        console.log(e)
    }
    return false
}

export default createToken