// import nodemailer from "nodemailer";
// import { render } from "@react-email/components";
// import RegisterEmail from "./src/components/RegisterEmail";

// type EmailOptions = {
//     toEmail: string;
//     subject: string;
//     component?: JSX.Element;
// };
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: import.meta.env.VITE_EMAIL_ADDRESS,
//         pass: import.meta.env.VITE_EMAIL_PASS,
//     },
// });

// export const sendEmail = ({ toEmail, subject, component="kk" }: EmailOptions) => {
//     const mailOption = {
//         from: import.meta.env.VITE_EMAIL_ADDRESS,
//         to: toEmail,
//         subject: subject,
//         html:component ,
//     };
//     return transporter.sendMail(mailOption);
// };
