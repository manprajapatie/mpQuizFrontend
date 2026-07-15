import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createQuizQuestions } from "../../services/quizAPI";

export const fetchQuizQuestions = createAsyncThunk(
    "createQuiz/fetchQuizQuestions",
    async ({ category, number, title }, { rejectWithValue }) => {
        try {
            const response = await createQuizQuestions(category, number, title);
            return response;
        } catch (err) {
            return rejectWithValue(err.message || "Failed to fetch quiz Questions");
        }
    }
);

const quizQuestionsSlice = createSlice({
    name: "createQuestions",
    initialState: {
        quizId: null,
        loading: false,
        error: null,
    },

    reducers: {
        clearQuiz(state) {

            state.quizId = null;

        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
                state.quizId = action.payload;
                state.loading = false;
            })
            .addCase(fetchQuizQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }

})

export const { clearQuiz } = quizQuestionsSlice.actions;
export default quizQuestionsSlice.reducer;