import {
    createAsyncThunk,
    createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import {RootState} from "../types/storeTypes";
import {QuestionType} from "../types/QuestionType";
import { returnQuestionListWithTimeout } from '../services/questionService';

export type QuestionState = {
    questionList: QuestionType[],
    selectedQuestion?: QuestionType,
    error: string,
    loading: boolean,
    switchedDelay: boolean,
};

const initialState: QuestionState = {
    questionList: [{
        id: '2',
        question: 'How can I add a question?',
        answer: 'Fill and submit "Create question" form'
    }, {
        id: '1',
        question: 'Can I add my own question?',
        answer: 'Yes of course :-)'
    }],
    error: '',
    loading: false,
    switchedDelay: false
};

export const updatetQuestionListAsync = createAsyncThunk('question/questionList', async (list: QuestionType[]) => {
    const listDataFromFakeService: QuestionType[] = await returnQuestionListWithTimeout(list);
    return {
        questionList: listDataFromFakeService
    }
});

export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        updateQuestionList: (state, action: PayloadAction<QuestionType[]>) => {
            state.questionList = action.payload;
        },
        selectQuestion: (state, action: PayloadAction<QuestionType>) => {
            state.selectedQuestion = action.payload;
        },
        deselectQuestion: (state, action: PayloadAction<void>) => {
            state.selectedQuestion = undefined;
        },
        switchQuestionDelay: (state, action: PayloadAction<boolean>) => {
            state.switchedDelay = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(updatetQuestionListAsync.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(updatetQuestionListAsync.fulfilled, (state, {payload}) => {
                state.questionList = payload.questionList
                state.loading = false;
            })
            .addCase(updatetQuestionListAsync.rejected, (state) => {
                state.loading = false;
                state.error = "Error getting question list";
            })
    },
});

export const {
    updateQuestionList,
    selectQuestion,
    deselectQuestion,
    switchQuestionDelay
} = questionSlice.actions;

export const getQuestionList = (state: RootState) => state.question.questionList;
export const getQuestionListLoading = (state: RootState) => state.question.loading;
export const getQuestionListError = (state: RootState) => state.question.error;
export const getSelectedQuestion = (state: RootState) => state.question.selectedQuestion;
export const getQuestionDelay = (state: RootState) => state.question.switchedDelay;

export default questionSlice.reducer;
