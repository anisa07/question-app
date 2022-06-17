import {ValidationResult} from "../types/validationTypes";

const fieldValidationResult = (condition: boolean, errorMessage: string): ValidationResult => {
    const result = {
        error: false,
        errorMessage: ''
    }
    if (condition) {
        result.error = true;
        result.errorMessage = errorMessage
    }
    return result;
}

export const valueIsRequired = (value: string): ValidationResult => {
    return fieldValidationResult((!value || !value.trim()), "Value required");
}
