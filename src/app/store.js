import { configureStore } from "@reduxjs/toolkit";

import allQuestionReducer from "../features/allQuestion/allQuestionSlice"

export const store = configureStore({
    reducer: {
        allQuestion: allQuestionReducer
    }
})