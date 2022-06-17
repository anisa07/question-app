import {findQuestionInTheList, prepareQuestionListForUpdate, returnListWithoutItem, sortQuestionList} from './quetionHelpers';

jest.mock('uuid', () => {
    return {
        v4: () => '1234Test'
    }
});

describe('Question Helper functions', () => {
    const list = [{
        id: '2',
        question: 'How can I add a question?',
        answer: 'Fill and submit "Create question" form'
    }, {
        id: '1',
        question: 'Can I add my own question?',
        answer: 'Yes of course :-)'
    }]
    it('sort question list', () => {
        expect(sortQuestionList(list)).toEqual([{
            id: '1',
            question: 'Can I add my own question?',
            answer: 'Yes of course :-)'
        }, {
            id: '2',
            question: 'How can I add a question?',
            answer: 'Fill and submit "Create question" form'
        }])
    });
    it('prepare list with new item for for update', () => {
        const newItem = {
            question: 'New Question',
            answer: 'New Item',
            id: ""
        };
        const updatedList = prepareQuestionListForUpdate(newItem, list);
        expect(updatedList).toEqual([...list, {...newItem, id: '1234Test'}]);
    });
    it('prepare list with existing item for for update', () => {
        const editItem = {
            id: '1',
            question: 'Can I add my own question?',
            answer: 'No'
        };
        const updatedList = prepareQuestionListForUpdate(editItem, list);
        expect(updatedList).toEqual([{
            id: '2',
            question: 'How can I add a question?',
            answer: 'Fill and submit "Create question" form'
        }, editItem]);
    });
    it('find question by id in the list', () => {
        expect(findQuestionInTheList('1', list)).toEqual({
            id: '1',
            question: 'Can I add my own question?',
            answer: 'Yes of course :-)'
        });
        expect(findQuestionInTheList('100', list)).toEqual(undefined);
    });
    it('remove item by id from the list', () => {
        expect(returnListWithoutItem('1', list)).toEqual([{
            id: '2',
            question: 'How can I add a question?',
            answer: 'Fill and submit "Create question" form'
        }]);
        expect(returnListWithoutItem('100', list)).toEqual(list);
    });
});
