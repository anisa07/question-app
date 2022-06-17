import React from 'react';
import {render, RenderResult, screen} from '@testing-library/react';
import {QuestionItem} from './QuestionItem';
import userEvent from '@testing-library/user-event';

describe('<QuestionItem />', () => {
    let wrapper: RenderResult;
    const spyEdit = jest.fn();
    const spyDelete = jest.fn();

    const item = {
        id: '1',
        question: 'How can I add a question?',
        answer: 'Fill and submit "Create question" form'
    }

    afterEach(() => {
        jest.clearAllMocks();
        wrapper.unmount();
    });

    it('render question item', async () => {
        wrapper = render(
            <QuestionItem
                item={item}
                onEditItem={spyEdit}
                onDeleteItem={spyDelete}
            />
        );
        const editButton: HTMLButtonElement = screen.getByTestId('edit');
        const deleteButton: HTMLButtonElement = screen.getByTestId('delete');
        const question: HTMLParagraphElement = screen.getByTestId('question');

        expect(screen.getByText('How can I add a question?')).toBeTruthy();
        expect(screen.queryByText('Fill and submit "Create question" form')).toBeFalsy();
        expect(editButton).toBeTruthy();
        expect(deleteButton).toBeTruthy();
        await userEvent.click(question);
        expect(screen.getByText('Fill and submit "Create question" form')).toBeTruthy();
    });

    it('edit item', async () => {
        wrapper = render(
            <QuestionItem
                item={item}
                onEditItem={spyEdit}
                onDeleteItem={spyDelete}
            />
        );

        const editButton: HTMLButtonElement = screen.getByTestId('edit');
        await userEvent.click(editButton);
        expect(spyEdit).toHaveBeenCalledWith(item.id);
    });

    it('delete item', async () => {
        wrapper = render(
            <QuestionItem
                item={item}
                onEditItem={spyEdit}
                onDeleteItem={spyDelete}
            />
        );

        const deleteButton: HTMLButtonElement = screen.getByTestId('delete');
        await userEvent.click(deleteButton);
        expect(spyDelete).toHaveBeenCalledWith(item.id);
    });
});
