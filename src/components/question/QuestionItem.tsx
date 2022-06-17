import {QuestionType} from "../../types/QuestionType";
import React, {useState} from "react";
import { ItemContainer } from "./styles";

interface QuestionItemProps {
    item: QuestionType,
    onEditItem: (id: string) => void
    onDeleteItem: (id: string) => void
}

export const QuestionItem = ({item, onEditItem, onDeleteItem}: QuestionItemProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleAnswerVisibility = () => {
        setIsVisible(!isVisible);
    }

    const handleSelect = () => {
        onEditItem(item.id);
    }

    const handleDelete = () => {
        onDeleteItem(item.id);
    }

    return (
        <ItemContainer key={item.id} className="item" data-testid="item">
            <div className="question">
                <p data-testid="question" onClick={handleAnswerVisibility}>{item.question}</p>
                <button onClick={handleSelect} className="edit" data-testid="edit">Edit &#x270E;</button>
                <button onClick={handleDelete} className="delete" data-testid="delete">Delete &#x2715;</button>
            </div>
            {isVisible && <p data-testid="answer" className="answer">{item.answer}</p>}
        </ItemContainer>
    )
}
