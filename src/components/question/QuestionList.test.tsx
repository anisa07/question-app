import React from 'react';
import {render, RenderResult, screen} from '@testing-library/react';
import {QuestionList} from './QuestionList';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import userEvent from '@testing-library/user-event';
import { sortQuestionList } from '../../helpers/quetionHelpers';

describe('<QuestionList />', () => {
    let wrapper: RenderResult;

    afterEach(() => {
        wrapper.unmount();
    });

    it('render question list', () => {
        wrapper = render(
            <Provider store={store}>
                <QuestionList />
            </Provider>
        );
        expect(screen.getByText('Created questions')).toBeTruthy();
        expect(screen.getAllByTestId('item').length).toBe(2);
    });
    it('sort question list', async () => {
        wrapper = render(
            <Provider store={store}>
                <QuestionList />
            </Provider>
        );

        const questionList = store.getState().question.questionList;

        const getQuestions = () => Array.from(screen.getAllByTestId('question')).map((item: Element) => item.textContent);

        const questions = getQuestions();
        expect(questions).toEqual(questionList.map(item => item.question));
        expect(screen.getByText('Sort questions')).toBeTruthy();
        await userEvent.click(screen.getByTestId('sort-questions'));
        const sortedQuestions = getQuestions();
        expect(sortedQuestions).toEqual(sortQuestionList(questionList).map(item => item.question));
        expect(screen.getByText('Undo sort questions')).toBeTruthy();
    });
    it('delete question list', async () => {
        wrapper = render(
            <Provider store={store}>
                <QuestionList />
            </Provider>
        );

        expect(screen.getAllByTestId('item').length).toBe(2);
        await userEvent.click(screen.getByTestId("delete-questions"));
        expect(screen.queryAllByTestId('item').length).toBe(0);
        expect(screen.getByTestId('no-questions')).toBeTruthy();
    });
});
