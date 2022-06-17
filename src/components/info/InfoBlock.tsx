import { getQuestionList } from "../../features/questionSlice";
import { useAppSelector } from "../../hooks/reduxHooks";
import { InfoContainer } from "./styles";

export const InfoBlock = () => {
    const listOfQuestions = useAppSelector(getQuestionList);

    const questionLength = () => {
        const qLength = listOfQuestions.length;
        return qLength === 0 ? 'no questions' : qLength > 1 ? `${qLength} questions` : '1 question'
    }

    return (
        <InfoContainer>{`Here you can find ${questionLength()}. 
        Feel free to create you own questions!`}</InfoContainer>
    )
}
