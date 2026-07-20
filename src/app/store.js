import { configureStore } from "@reduxjs/toolkit";

import allQuestionReducer from "../features/allQuestion/allQuestionSlice"
import quizQuestionsReducer from "../features/quizCreation/quizCreation"
import quizReducer from "../features/quiz/quizSlice"
import createQuizReducer from "../features/quizCreation/quizCreation"
import submitQuizReducer from "../features/submitQuiz/submitQuizSlice"
import quizListReducer from "../features/quizList/quizListSlice";

export const store = configureStore({
    reducer: {
        allQuestion: allQuestionReducer,
        quizQuestion: quizQuestionsReducer,
        createQuiz: createQuizReducer,
        quiz: quizReducer,
        quizList: quizListReducer,
        submitQuiz: submitQuizReducer
    }
})