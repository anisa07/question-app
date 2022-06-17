import {ChangeEvent} from "react";
import { StyledInput, ErrorMessage } from "./styles";

export interface InputProps {
    value: string,
    name: string,
    error: boolean,
    errorMessage: string,
    label?: string,
    onChange: (v: ChangeEvent<HTMLInputElement>) => void,
}

export const Input = ({value, name, errorMessage, error, onChange, label}: InputProps) => {
    return (
        <div>
            <p>{label}</p>
            <StyledInput
                error={error}
                value={value}
                name={name}
                onChange={onChange}
            />
            <ErrorMessage>{errorMessage}</ErrorMessage>
        </div>
    )
}
