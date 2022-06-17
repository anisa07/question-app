import React from 'react';
import {render, RenderResult, waitFor} from '@testing-library/react';
import {QuestionList} from './QuestionList';
import {Provider} from 'react-redux';
import {store} from '../../store/store';
import userEvent from '@testing-library/user-event';
import {sortQuestionList} from '../../helpers/quetionHelpers';
import {QuestionForm} from './QuestionForm';

describe('<QuestionForm />', () => {
    let wrapper: RenderResult;
    let question: HTMLInputElement;
    let answer: HTMLTextAreaElement;
    let saveForm: HTMLButtonElement;
    let resetForm: HTMLButtonElement;

    const spySubmit = jest.fn();
    const spyClear = jest.fn();

    beforeEach(() => {
        wrapper = render(
            <QuestionForm onClearForm={spyClear} onSubmit={spySubmit}/>
        );
        question = document.querySelector('input[name="question"]') as HTMLInputElement;
        answer = document.querySelector('textarea[name="answer"]') as HTMLTextAreaElement;
        saveForm = document.querySelector('[data-testid="save-form"]') as HTMLButtonElement;
        resetForm = document.querySelector('[data-testid="reset-form"]') as HTMLButtonElement;
    });

    afterEach(() => {
        wrapper.unmount();
        jest.clearAllMocks();
    });

    it('render question form', () => {
        expect(question).toBeTruthy();
        expect(answer).toBeTruthy();
        expect(question).toHaveValue("");
        expect(answer).toHaveValue("");
        expect(saveForm.disabled).toBeTruthy();
        expect(resetForm.disabled).toBeFalsy();
    });
    it('fill and submit form', async () => {
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
        wrapper.unmount();
        wrapper = render(
            <QuestionForm onClearForm={spyClear} onSubmit={spySubmit} item={{
                id: "123", answer: "Old Answer", question: "Old Question"
            }}/>
        );
        question = document.querySelector('input[name="question"]') as HTMLInputElement;
        answer = document.querySelector('textarea[name="answer"]') as HTMLTextAreaElement;
        saveForm = document.querySelector('[data-testid="save-form"]') as HTMLButtonElement;
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
