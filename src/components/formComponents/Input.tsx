import {ChangeEvent} from "react";
import { StyledInput, ErrorMessage } from "./styles";

export interface InputProps {
    value: string,
    name: string,
    error: boolean,
    errorMessage: string,
    label?: string,
    dataTestId?: string,
    onChange: (v: ChangeEvent<HTMLInputElement>) => void,
}

export const Input = ({value, name, errorMessage, error, onChange, label, dataTestId}: InputProps) => {
    return (
        <div>
            <p>{label}</p>
            <StyledInput
                data-testid={dataTestId}
                error={error}
                value={value}
                name={name}
                onChange={onChange}
            />
            <ErrorMessage>{errorMessage}</ErrorMessage>
        </div>
    )
}
