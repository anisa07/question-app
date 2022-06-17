import React from 'react';
import {render, RenderResult, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {QuestionForm} from './QuestionForm';

describe('<QuestionForm />', () => {
    let wrapper: RenderResult;
    const spySubmit = jest.fn();
    const spyClear = jest.fn();

    afterEach(() => {
        wrapper.unmount();
        jest.clearAllMocks();
    });

    it('render question form', () => {
        wrapper = render(
            <QuestionForm onClearForm={spyClear} onSubmit={spySubmit}/>
        );
        const question = screen.getByTestId('question');
        const answer = screen.getByTestId('answer');
        const saveForm: HTMLButtonElement = screen.getByTestId('save-form');
        const resetForm: HTMLButtonElement = screen.getByTestId('reset-form');

        expect(question).toBeTruthy();
        expect(answer).toBeTruthy();
        expect(question).toHaveValue("");
        expect(answer).toHaveValue("");
        expect(saveForm.disabled).toBeTruthy();
        expect(resetForm.disabled).toBeFalsy();
    });
    it('fill and submit form', async () => {
        wrapper = render(
            <QuestionForm onClearForm={spyClear} onSubmit={spySubmit}/>
        );
        const question = screen.getByTestId('question');
        const answer = screen.getByTestId('answer');
        const saveForm: HTMLButtonElement = screen.getByTestId('save-form');
        await userEvent.type(question, "New Question");
        await userEvent.type(answer, "New Answer");
        expect(saveForm.disabled).toBeFalsy();
        await userEvent.click(saveForm);
        expect(spySubmit).toHaveBeenCalledWith({
            answer: "New Answer", id: "", question: "New Question"
        });
        expect(spyClear).not.toHaveBeenCalled();
        expect(question).toHaveValue("");
        expect(answer).toHaveValue("");
        expect(saveForm.disabled).toBeTruthy();
    });
    it('edit item and submit form', async () => {
        wrapper = render(
            <QuestionForm onClearForm={spyClear} onSubmit={spySubmit} item={{
                id: "123", answer: "Old Answer", question: "Old Question"
            }}/>
        );
        const question = screen.getByTestId('question');
        const answer = screen.getByTestId('answer');
        const saveForm: HTMLButtonElement = screen.getByTestId('save-form');
        expect(question).toHaveValue("Old Question");
        expect(answer).toHaveValue("Old Answer");

        await userEvent.clear(question);
        expect(saveForm.disabled).toBeTruthy();
        await userEvent.type(question, "New Question");
        await userEvent.click(saveForm);
        expect(spySubmit).toHaveBeenCalledWith({
            answer: "Old Answer", id: "123", question: "New Question"
        });
        expect(spyClear).toHaveBeenCalled();
        expect(question).toHaveValue("");
        expect(answer).toHaveValue("");
        expect(saveForm.disabled).toBeTruthy();
    });
});
