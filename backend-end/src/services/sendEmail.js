import nodemailer from 'nodemailer'
import emailTemplate from './emailTemplate';

const transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendEmail = (toEmail, emailTitle, emailBody) => {
    const mailOptions = {
        from: process.env.EMAIL, // sender address
        to: toEmail, // list of receivers
        subject: emailTitle, // Subject line
        html: emailTemplate.emailResetPassword(emailBody)// plain text body
    };
    return transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}

export default {
    sendEmail
}