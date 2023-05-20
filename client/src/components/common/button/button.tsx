import { FC } from "react";
import style from "./button.module.css"

interface ButtonProps {
    text: string;
    type: "Primary" | "Secondary";
}

const Button: FC<ButtonProps> = ({ text, type }) => {
    return <button className={`${style.button} ${style[type]}`}>{text}</button>;
};

export default Button;
