import React from 'react';
import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import {QuestionItem} from './QuestionItem';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import userEvent from '@testing-library/user-event';
import { sortQuestionList } from '../../helpers/quetionHelpers';

describe('<QuestionItem />', () => {
    let wrapper: RenderResult;
    const spyEdit = jest.fn();
    const spyDelete = jest.fn();
    let editButton: HTMLButtonElement;
    let deleteButton: HTMLButtonElement;
    let question: HTMLParagraphElement;
    let answer: HTMLParagraphElement;
    const item = {
        id: '1',
        question: 'How can I add a question?',
        answer: 'Fill and submit "Create question" form'
    }

    beforeEach(() => {
        wrapper = render(
            <QuestionItem
                item={item}
                onEditItem={spyEdit}
                onDeleteItem={spyDelete}
            />
        );
        editButton = document.querySelector('.edit') as HTMLButtonElement;
        deleteButton = document.querySelector('.delete') as HTMLButtonElement;
        question = document.querySelector('[data-testid="question"]') as HTMLParagraphElement;
        answer = document.querySelector('[data-testid="answer"]') as HTMLParagraphElement;
    });

    afterEach(() => {
        jest.clearAllMocks();
        wrapper.unmount();
    });

    it('render question item', async () => {
        const { getByText, queryByText } = wrapper;
        expect(getByText('How can I add a question?')).toBeTruthy();
        expect(queryByText('Fill and submit "Create question" form')).toBeFalsy();
        expect(editButton).toBeTruthy();
        expect(deleteButton).toBeTruthy();
        await userEvent.click(question);
        expect(getByText('Fill and submit "Create question" form')).toBeTruthy();
    });

    it('edit item', async () => {
        await userEvent.click(editButton);
        expect(spyEdit).toHaveBeenCalledWith(item.id);
    });

    it('delete item', async () => {
        await userEvent.click(deleteButton);
        expect(spyDelete).toHaveBeenCalledWith(item.id);
    });
});
