import { render } from "@react-email/components";
import RegisterEmail from "../../components/RegisterEmail";
import { ButtonStyle } from "../../components/common/button";
import { Input } from "../../components/common/input";
import useInput from "../../hooks/useInput";
import { envelopeIcon, errorIcon } from "../../icons";
import axios from "../../api/axios";
import { FormEvent, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import "./style.css";
import Container from "../../components/container";

const login = () => {
    let [isEmailSent, setIsEmailSent] = useState<boolean>(false);
    const [error, setError] = useState<boolean>();
    const location = useLocation();

    const [emailValue, emailInputStatus, setEmailStatus, handleEmailInput] =
        useInput({
            REGEX: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        });

    const handleOnSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            let response = await axios.post("login", {
                email: emailValue,
            });
            let { magicEmailToken } = response.data;

            let res = await axios.post("sendEmail", {
                toEmail: emailValue,
                subject: "verify email",
                message: render(
                    <RegisterEmail
                        magicToken={`login/verify?token=${magicEmailToken}`}
                        type={"login"}
                    />
                ),
            });
        } catch (err: any) {
            console.log(err);
            if (err.response.data.error === "already logged in")
                <Navigate to="/" state={{ from: location }} replace />;
            setError(err.response.data.error);
            return;
        }
    };

    return (
        <Container className="hi">
            {isEmailSent ? (
                <h2>Email sent</h2>
            ) : (
                <form className="login_form" onSubmit={handleOnSubmit}>
                    <h2 className="form_title">login</h2>
                    {error ? <p>{error}</p> : ""}
                    <Input
                        type="email"
                        id="email"
                        icon={envelopeIcon}
                        status={emailInputStatus}
                        value={emailValue}
                        required
                        // autoComplete="off"
                        aria-invalid={
                            emailInputStatus === "Success" ? "true" : "false"
                        }
                        aria-describedby="eidnote"
                        onInput={handleEmailInput}
                        onFocus={() =>
                            setEmailStatus((prev) =>
                                prev === "Normal" ? "Clicked" : prev
                            )
                        }
                    />
                    <p
                        id="eidnote"
                        className={`errorMessage
                        ${emailInputStatus === "Error" ? "show" : "hide"}
                    `}
                    >
                        {errorIcon} Invalid email address
                    </p>
                    <button
                        className={`${ButtonStyle.button} ${ButtonStyle.Primary} form_submit_btn`}
                    >
                        Log In
                    </button>
                </form>
            )}
        </Container>
    );
};

export default login;
