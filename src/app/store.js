import { configureStore } from "@reduxjs/toolkit";

import allQuestionReducer from "../features/allQuestion/allQuestionSlice"
import quizQuestionsReducer from "../features/quizCreation/quizCreation"

export const store = configureStore({
    reducer: {
        allQuestion: allQuestionReducer,
        quizQuestion: quizQuestionsReducer,
    }
})