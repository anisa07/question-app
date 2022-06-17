import { switchQuestionDelay, getQuestionDelay } from "../../features/questionSlice";
import {useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Checkbox } from "../Checkbox";
import { HeaderContainer } from "./styles";

export const QuestionAppHeader = () => {
    const questionDelayed = useAppSelector(getQuestionDelay);
    const dispatch = useAppDispatch();

    const handleDelaySwitch = () => {
        dispatch(switchQuestionDelay(!questionDelayed));
    }

    return (<HeaderContainer>
        <h2>The awesome Q/A tool</h2>
        <Checkbox onCheck={handleDelaySwitch} label="Delay 5s" value={questionDelayed} />
    </HeaderContainer>)
}
