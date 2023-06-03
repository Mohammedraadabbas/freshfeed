import { useState, useEffect, ChangeEvent } from "react";

interface InputHookProps {
    initialValue?: string;
    REGEX: RegExp;
}

export type  InputStatus = "Normal" | "Success" | "Error" | "Clicked";

type InputHookResult = [
    string,
    InputStatus,
    React.Dispatch<React.SetStateAction<InputStatus>>,
    (e: ChangeEvent<HTMLInputElement>) => void
];

const useInput = ({
    initialValue = "",
    REGEX,
}: InputHookProps): InputHookResult => {
    const [value, setValue] = useState(initialValue);
    const [status, setStatus] = useState<InputStatus>("Normal");

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        // check if the input clicked for the first time
        if (status === "Normal") return;

        if (!REGEX.test(value)) {
            setStatus("Error");
            return;
        }

        setStatus("Success");
    }, [value]);

    return [value, status, setStatus, handleInput];
};

export default useInput;
