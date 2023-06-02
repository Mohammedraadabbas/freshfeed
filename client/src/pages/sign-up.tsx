import { useState } from "react";
import { Form } from "../components/form";
import { render } from "@react-email/components";
import RegisterEmail from "../components/RegisterEmail";
import axios from "../api/axios";
import useInput from "../hooks/useInput";
import { Navigate } from "react-router-dom";

const SignUp = () => {
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [nameValue, nameInputStatus, setNameStatus, handleNameInput] =
        useInput({
            REGEX: /^[A-Za-z][A-Za-z0-9-_]{3,23}$/,
        });

    const [emailValue, emailInputStatus, setEmailStatus, handleEmailInput] =
        useInput({
            REGEX: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        });
        const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmit(true)
        if (nameInputStatus !== "Success" || emailInputStatus !== "Success")
            return;

        try {
            let response = await axios.post("register", {
                name: nameValue,
                email: emailValue,
                sex: "male",
            });
            let { magicEmailToken } = response.data;

            let res = await axios.post("sendEmail", {
                toEmail: emailValue,
                subject: "verify email",
                message: render(
                    <RegisterEmail
                        magicToken={`register/verify?token=${magicEmailToken}`}
                    />
                ),
            });
        } catch (err: any) {
            if (err.response.data.error === "already logged in")
            return <Navigate to="/" state={{ from: location }} replace />;
            console.log(err);
            // setError(err.message);
            return;
        }
    };

    return (
        <main>
            {isEmailSent ? (
                <h3>email sent</h3>
            ) : (
                <div className="container sign-up">
                    <div className="left-con">
                        <h3 className="form-title">
                            Sign up and write your first article
                        </h3>
                        <Form
                            error={error}
                            handleSubmit={handleSubmit}
                            nameValue={nameValue}
                            nameInputStatus={nameInputStatus}
                            setNameStatus={setNameStatus}
                            handleNameInput={handleNameInput}
                            emailValue={emailValue}
                            emailInputStatus={emailInputStatus}
                            setEmailStatus={setEmailStatus}
                            handleEmailInput={handleEmailInput}
                            isSubmit={isSubmit}
                            style={{ maxWidth: "400px" }}
                        />
                    </div>
                    <div className="right-con">
                        <img src="/01_moving_up 1.svg" alt="" />
                    </div>
                </div>
            )}
        </main>
    );
};

export default SignUp;
