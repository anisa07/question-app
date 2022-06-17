import React from 'react';
import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import {QuestionList} from './QuestionList';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import userEvent from '@testing-library/user-event';
import { sortQuestionList } from '../../helpers/quetionHelpers';

describe('<QuestionList />', () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(
            <Provider store={store}>
                <QuestionList />
            </Provider>
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('render question list', () => {
        const { getByText } = wrapper;
        expect(getByText('Created questions')).toBeTruthy();
        expect(document.querySelectorAll('.item').length).toBe(2);
    });
    it('sort question list', async () => {
        const questionList = store.getState().question.questionList;

        const { getByText } = wrapper;

        const getQuestions = () => Array.from(document.querySelectorAll('.question p')).map((item: Element) => item.textContent);

        const questions = getQuestions();
        expect(questions).toEqual(questionList.map(item => item.question));
        expect(getByText('Sort questions')).toBeTruthy();
        await userEvent.click(document.querySelector('[data-testid="sort-questions"]') as Element);
        const sortedQuestions = getQuestions();
        expect(sortedQuestions).toEqual(sortQuestionList(questionList).map(item => item.question));
        expect(getByText('Undo sort questions')).toBeTruthy();
    });
    it('delete question list', async () => {
        const { getByText, debug } = wrapper;
        expect(document.querySelectorAll('.item').length).toBe(2);
        await userEvent.click(document.querySelector('[data-testid="delete-questions"]') as Element);
        expect(document.querySelectorAll('.item').length).toBe(0);
        expect(document.querySelector('[data-testid="no-questions"]')).toBeTruthy();
    });
});
