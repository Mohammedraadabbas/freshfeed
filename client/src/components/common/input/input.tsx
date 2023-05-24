import { FC, InputHTMLAttributes } from "react";
import style from "./input.module.css";

let mark = (
    <svg
        className={style.mark}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M13.4999 4.50024L6.49988 11.4999L2.99988 8.00024"
            stroke="#0FAC1F"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon: JSX.Element | null;
    status: "Normal" | "Success" | "Error" | "Clicked";
}

const Input: FC<InputProps> = ({ status, icon, ...props }) => {
    return (
        <div className={style.inputWrapper}>
            {icon != null && (
                <div
                    className={`${style[status]} ${style.icon}`}
                    style={{ color: "var(--svgColor)" }}
                >
                    {icon}
                </div>
            )}
            <input className={`${style.input} ${style[status]}`} {...props} />
            {status === "Success" && mark}
        </div>
    );
};

export default Input;
