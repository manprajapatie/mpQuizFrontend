import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { submitQuiz } from "../../services/quizAPI";

export const submitQuizThunk = createAsyncThunk(
    "quiz/submitQuiz",

    async ({ quizId, answers }, { rejectWithValue }) => {

        try {

            const response = await submitQuiz(quizId, answers);

            return response;

        } catch (err) {

            return rejectWithValue(
                err || "Failed to submit quiz"
            );

        }

    }

);

const submitQuizSlice = createSlice({

    name: "submitQuiz",

    initialState: {

        score: null,

        loading: false,

        error: null

    },

    reducers: {

        clearResult(state) {

            state.score = null;

        }

    },

    extraReducers: (builder) => {

        builder

            .addCase(submitQuizThunk.pending, (state) => {

                state.loading = true;
                state.error = null;

            })

            .addCase(submitQuizThunk.fulfilled, (state, action) => {

                state.loading = false;
                state.score = action.payload;

            })

            .addCase(submitQuizThunk.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;

            });

    }

});

export const { clearResult } = submitQuizSlice.actions;

export default submitQuizSlice.reducer;