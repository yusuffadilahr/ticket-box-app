import nodemailer from 'nodemailer'
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yusuffadilah58@gmail.com',
        pass: 'wtmizxsvypvhgkit' // password dari google sign
    },
    tls: {
        rejectUnauthorized: false
    }
})