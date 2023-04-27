import nodemailer from "nodemailer";
type EmailOptions  ={
    toEmail: string,
    subject: string,
    message: string
}
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sendemailsendemailpro@gmail.com",
        pass: "prrskgifznbwjtzp",
    },
});

export const sendEmail = ({toEmail,subject,message}:EmailOptions) => {
    const mailOption = {
        from: "sendemailsendemailpro@gmail.com",
        to: toEmail,
        subject: subject,
        html: message,
    };
    return transporter.sendMail(mailOption);
};
