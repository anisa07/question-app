import {InputProps} from "./Input";
import {ChangeEvent} from "react";
import { ErrorMessage, StyledArea } from "./styles";

export interface TextAreaProps extends InputProps {}

export const TextArea = ({value, name, errorMessage, error, onChange, label, dataTestId}: TextAreaProps) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange({target: {
                name,
                value: e.target.value
            }} as unknown as ChangeEvent<HTMLInputElement>)
    }

    return (
        <div>
            <p>{label}</p>
            <StyledArea
                data-testid={dataTestId}
                error={error}
                rows={5}
                value={value}
                name={name}
                onChange={handleChange}
            />
            <ErrorMessage>{errorMessage}</ErrorMessage>
        </div>
    )
}
