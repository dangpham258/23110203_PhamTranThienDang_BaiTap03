require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: Number(process.env.MAILER_PORT) || 587,
    secure: process.env.MAILER_SECURE === "true",
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
    },
});

const sendEmail = async ({ to, subject, text, html }) => {
    const mailOptions = {
        from: process.env.MAIL_FROM || process.env.MAILER_USER,
        to,
        subject,
        text,
        html,
    };

    try {
        await transporter.verify();
    } catch (error) {
        console.error("Email transporter verification failed:", error);
        throw error;
    }

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendEmail,
};
