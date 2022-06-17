import {QuestionItem} from "./QuestionItem";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {selectQuestion, updateQuestionList, getQuestionList, getQuestionListLoading, updatetQuestionListAsync, getQuestionDelay} from "../../features/questionSlice";
import {QuestionType} from "../../types/QuestionType";
import {findQuestionInTheList, sortQuestionList, returnListWithoutItem} from "../../helpers/quetionHelpers";
import { Button, WarnButton } from "../../styles/Button";
import { Container } from "./styles";
import { Title } from "../title/Title";
import { Loading } from "../loading/Loading";

export const QuestionList = () => {
    const dispatch = useAppDispatch();
    const isDelayed = useAppSelector(getQuestionDelay);
    const listOfQuestions = useAppSelector(getQuestionList);
    const isLoadingQuestions = useAppSelector(getQuestionListLoading);
    const [sortedQuestions, setSortedQuestions] = useState<QuestionType[]>([]);
    const [isSorted, setIsSorted] = useState(false);

    useEffect(() => {
        sortQuestions(isSorted);
    }, [listOfQuestions, isSorted]);

    const sortQuestions = (newSorted: boolean) => {
        setSortedQuestions(newSorted ? sortQuestionList(listOfQuestions) : listOfQuestions);
    }

    const handleQuestionSorting = () => {
        setIsSorted(!isSorted);
    }

    const updateList = (list: QuestionType[]) => {
        dispatch(isDelayed ? updatetQuestionListAsync(list) : updateQuestionList(list));
    }

    const handleDeleteAllQuestions = () => {
        updateList([]);
    }

    const sortButtonTitle = () => isSorted ? 'Undo sort questions' : 'Sort questions';

    const handleSelectQuestion = (id: string) => {
        const item = findQuestionInTheList(id, listOfQuestions);
        if (item) {
            dispatch(selectQuestion(item));
        }
    }

    const handleDeleteQuestion = (id: string) => {
        updateList(returnListWithoutItem(id, listOfQuestions));
    }

    const renderQuestionList = () => (
        <div>
            {sortedQuestions.map(questionObject => (
                <QuestionItem
                    key={questionObject.id}
                    item={questionObject}
                    onEditItem={handleSelectQuestion}
                    onDeleteItem={handleDeleteQuestion}
                />
            ))}
            <Button onClick={handleQuestionSorting} data-testid="sort-questions">{sortButtonTitle()}</Button>
            <WarnButton disabled={!sortedQuestions.length} onClick={handleDeleteAllQuestions}
                        data-testid="delete-questions">Delete all questions</WarnButton>
        </div>
    )

    const renderEmptyState = () => (
        <div data-testid="no-questions">No questions yet :(</div>
    )

    return (
        <Container>
            <Title text="Created questions" info="Here you can find the created questions and their answers."/>
            {
                isLoadingQuestions
                    ? <Loading />
                    : sortedQuestions.length
                        ? renderQuestionList()
                        : renderEmptyState()
            }
        </Container>
    )
}
