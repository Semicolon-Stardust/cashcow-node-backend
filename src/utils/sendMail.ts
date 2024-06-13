import nodemailer from 'nodemailer';

const sendMail = async (option: any) => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        secure: true,
        port: 465,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: option.email,
        subject: option.subject,
        text: option.message
    }

    await transporter.sendMail(mailOptions);

}

export default sendMail;