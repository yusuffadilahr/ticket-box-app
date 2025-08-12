import { config } from 'dotenv';
import nodemailer from 'nodemailer'
config()

const passwordEmail = process.env.PASSWORD_WEB_EMAIL || ''
export const transporter = nodemailer.createTransport({
    host: 'mail.gancy.my.id',
    port: 465,
    secure: true,
    auth: {
        user: 'ticket-box@gancy.my.id',
        pass: passwordEmail,
    },
    tls: {
        rejectUnauthorized: false,
    },
});