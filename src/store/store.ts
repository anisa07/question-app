import {
    configureStore,
} from '@reduxjs/toolkit';
import {questionSlice} from "../features/questionSlice";

export const store = configureStore({
    reducer: {
        question: questionSlice.reducer
    },
});
