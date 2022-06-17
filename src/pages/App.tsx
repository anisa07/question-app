import React from 'react';
import {QuestionList} from "../components/question/QuestionList";
import { CreateOrEditQuestion } from '../components/question/CreateOrEditQuestion';
import { QuestionAppHeader } from '../components/header/QuestionAppHeader';
import { InfoBlock } from '../components/info/InfoBlock';
import { AppContent } from './styles';

function App() {
    return (
        <>
            <QuestionAppHeader />
            <AppContent>
                <div className="first-block">
                    <InfoBlock />
                </div>
                <div className="second-block">
                    <QuestionList/>
                    <CreateOrEditQuestion />
                </div>
            </AppContent>
        </>
    );
}

export default App;
