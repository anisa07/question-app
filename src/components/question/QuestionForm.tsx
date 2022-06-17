import React, {FormEvent, useEffect} from "react";
import {QuestionType} from "../../types/QuestionType";
import {useFormCustomHook} from "../../hooks/useFormHook";
import {valueIsRequired} from "../../helpers/formValidationHelper";
import {Input} from "../formComponents/Input";
import {TextArea} from "../formComponents/TextArea";
import {Button, WarnButton} from "../../styles/Button";

interface QuestionFormProps {
    item?: QuestionType,
    onSubmit: (item: QuestionType) => void
    onClearForm: () => void;
}

export const QuestionForm = ({item, onSubmit, onClearForm}: QuestionFormProps) => {
    const {onChange, isValid, form, resetFormData, cleanFormData} = useFormCustomHook({
        question: {
            value: '',
            error: false,
            errorMessage: '',
            validation: [valueIsRequired]
        },
        answer: {
            value: '',
            error: false,
            errorMessage: '',
            validation: [valueIsRequired]
        },
    });

    useEffect(() => {
        if (item) {
            resetFormData({
                question: {
                    value: item.question,
                    error: false,
                    errorMessage: '',
                    validation: [valueIsRequired]
                },
                answer: {
                    value: item.answer,
                    error: false,
                    errorMessage: '',
                    validation: [valueIsRequired]
                },
            })
        }
    }, [item])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({
            id: item ? item.id : '',
            question: form.question.value,
            answer: form.answer.value,
        });
        handleClearForm();
    }

    const handleClearForm = (e?: FormEvent) => {
        if (e) {
            e.preventDefault();
        }
        if (item) {
            onClearForm()
        }
        cleanFormData();
    }

    return (
        <form>
            <div className="item">
                <Input
                    dataTestId="question"
                    name="question"
                    value={form.question.value}
                    label="Question"
                    error={form.question.error}
                    errorMessage={form.question.errorMessage}
                    onChange={onChange}
                />
            </div>
            <div className="item">
                <TextArea
                    dataTestId="answer"
                    name="answer"
                    value={form.answer.value}
                    label="Answer"
                    error={form.answer.error}
                    errorMessage={form.answer.errorMessage}
                    onChange={onChange}
                />
            </div>
            <Button disabled={!isValid()} onClick={handleSubmit} data-testid="save-form">Save</Button>
            <WarnButton onClick={handleClearForm} data-testid="reset-form">Clear form</WarnButton>
        </form>
    )
}
