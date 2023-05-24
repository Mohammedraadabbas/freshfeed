import { FC } from "react";
import style from "./form.module.css";
import { Input } from "../common/input";
import useInput from "../../hooks/useInput";
import { ButtonStyle } from "../common/button";
import { userIcon, envelopeIcon,errorIcon } from "../../icons";


<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
>
    <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
</svg>;

const SignUp: FC<HTMLFormElement> = ({ ...props }) => {
    const [nameValue, nameInputStatus, setNameStatus, handleNameInput] =
        useInput({
            REGEX: /^[A-z][A-z0-9-_]{3,23}$/,
        });

    const [emailValue, emailInputStatus, setEmailStatus, handleEmailInput] =
        useInput({
            REGEX: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (nameInputStatus !== "Success" || emailInputStatus !== "Success") return
        alert("You have successfully submitted your account")
    };

    return (
        <form className={style.form} onSubmit={handleSubmit} {...props}>
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
                        setNameStatus((prev) =>
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
                        setEmailStatus((prev) =>
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
                className={`${ButtonStyle.button} ${ButtonStyle.Primary}`}
            >
                Submit
            </button>
        </form>
    );
};

export default SignUp;
