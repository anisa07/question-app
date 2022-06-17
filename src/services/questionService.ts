import { QuestionType } from "../types/QuestionType";

const TIMEOUT = 5000;

export const returnQuestionListWithTimeout = async (list: QuestionType[]): Promise<QuestionType[]> => {
    await new Promise((res) => setTimeout(res, TIMEOUT));
    return list;
}
