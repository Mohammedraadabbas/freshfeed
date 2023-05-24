import { FC } from "react";
import style from "./button.module.css"

interface ButtonProps {
    type: "Primary" | "Secondary";
}

const Button: FC<ButtonProps> = ({ type }) => {
    return <button className={`${style.button} ${style[type]}`}></button>;
};

export default Button;
