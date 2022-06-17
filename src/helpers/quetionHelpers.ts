import { v4 as uuidv4 } from 'uuid';
import {QuestionType} from "../types/QuestionType";

export const sortQuestionList = (list: QuestionType[]): QuestionType[] => {
    return [...list].sort((item1, item2) => {
        if (item1.question > item2.question)
            return 1;
        if (item1.question < item2.question)
            return -1;
        return 0
    })
}

export const prepareQuestionListForUpdate = (item: QuestionType, list: QuestionType[]): QuestionType[] => {
    if (item.id && findQuestionInTheList(item.id, list)) {
        const updatedList = [...list];
        const itemIndex = list.findIndex(qItem => qItem.id === item.id);
        if(itemIndex > -1) {
            updatedList.splice(itemIndex, 1, item);
        }
        return updatedList;
    }
    return [...list, {...item, id: uuidv4()}];
}

export const findQuestionInTheList = (id: string, list: QuestionType[]): QuestionType | undefined => {
    return list.find(item => item.id === id)
}

export const returnListWithoutItem = (id: string, list: QuestionType[]): QuestionType[] => {
    return list.filter(item => item.id !== id);
}
