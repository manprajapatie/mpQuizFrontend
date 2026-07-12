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
        data: null,
        loading: false,
        error: null,
    },

    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchQuizQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }

})

export default quizQuestionsSlice.reducer;