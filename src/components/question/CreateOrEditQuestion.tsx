import {
    deselectQuestion,
    getSelectedQuestion,
    getQuestionList,
    updateQuestionList,
    getQuestionDelay,
    updatetQuestionListAsync
} from "../../features/questionSlice";
import {prepareQuestionListForUpdate} from "../../helpers/quetionHelpers";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {QuestionType} from "../../types/QuestionType";
import { Container } from "./styles";
import {QuestionForm} from "./QuestionForm";
import { Title } from "../title/Title";

export const CreateOrEditQuestion = () => {
    const listOfQuestions = useAppSelector(getQuestionList);
    const selectedItem = useAppSelector(getSelectedQuestion);
    const isDelayed = useAppSelector(getQuestionDelay);
    const dispatch = useAppDispatch();

    const handleSubmitQuestion = (item: QuestionType) => {
        const updatedList = prepareQuestionListForUpdate(item, listOfQuestions);
        dispatch(isDelayed ? updatetQuestionListAsync(updatedList) : updateQuestionList(updatedList));
    }

    const handleClearForm = () => {
        dispatch(deselectQuestion());
    }

    const formTitle = () => selectedItem ? "Edit question" : "Create question";

    return (
        <Container>
            <Title text={formTitle()} info="Here you can create questions and their answers."/>
            <QuestionForm item={selectedItem} onSubmit={handleSubmitQuestion} onClearForm={handleClearForm}/>
        </Container>
    )
}

