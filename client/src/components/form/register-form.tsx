import { FC, useState } from "react";
import style from "./form.module.css";
import { Input } from "../common/input";
import { ButtonStyle } from "../common/button";
import { userIcon, envelopeIcon, errorIcon } from "../../icons";
import axios from "../../api/axios";
import RegisterEmail from "../RegisterEmail";
import { render } from "@react-email/components";

type status = "Normal" | "Success" | "Error" | "Clicked";

interface SignUpPros {
    isSubmit: boolean;
    nameValue: string;
    nameInputStatus: status;
    setNameStatus: React.Dispatch<React.SetStateAction<status>>;
    handleNameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    emailValue: string;
    emailInputStatus: status;
    setEmailStatus: React.Dispatch<React.SetStateAction<status>>;
    handleEmailInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit :  (e: React.FormEvent) => void;
    error: string
}

const SignUp: FC<SignUpPros> = ({
    nameValue,
    nameInputStatus,
    setNameStatus,
    handleNameInput,
    emailValue,
    emailInputStatus,
    setEmailStatus,
    handleEmailInput,
    handleSubmit,
    error,
    isSubmit,
    ...props
}) => {
    

    return (
        <form className={style.form} onSubmit={handleSubmit} {...props}>
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
            <div className={style.formGroupe}>
                <label htmlFor="name" className={style.label}>
                    Name
                </label>
                <Input
                    type="text"
                    id="name"
                    icon={userIcon}
                    status={nameInputStatus}
                    value={nameValue}
                    required
                    // autoComplete="off"
                    aria-invalid={
                        nameInputStatus === "Success" ? "true" : "false"
                    }
                    aria-describedby="uidnote"
                    onInput={handleNameInput}
                    onFocus={() =>
                        setNameStatus((prev: status) =>
                            prev === "Normal" ? "Clicked" : prev
                        )
                    }
                />
                <p
                    id="uidnote"
                    className={`${style.errorMessage}
                        ${nameInputStatus === "Error" ? style.show : style.hide}
                    `}
                >
                    {errorIcon} 4 to 24 characters.
                    {/* <br /> */}
                    Must begin with a letter.
                    {/* <br /> */}
                    Letters, numbers, underscores, hyphens allowed.
                </p>
            </div>
            <div className={style.formGroupe}>
                <label htmlFor="name" className={style.label}>
                    Name
                </label>
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
                        setEmailStatus((prev:status) =>
                            prev === "Normal" ? "Clicked" : prev
                        )
                    }
                />
                <p
                    id="eidnote"
                    className={`${style.errorMessage}
                        ${
                            emailInputStatus === "Error"
                                ? style.show
                                : style.hide
                        }
                    `}
                >
                    {errorIcon} Invalid email address
                </p>
            </div>
            <button
                type="submit"
                disabled={isSubmit}
                className={`${ButtonStyle.button} ${ButtonStyle.Primary}`}
            >
                Submit
            </button>
        </form>
    );
};

export default SignUp;
