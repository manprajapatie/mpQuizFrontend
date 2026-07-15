import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuizQuestions } from "../../services/quizAPI";

export const fetchQuizById = createAsyncThunk(
    "quiz/fetchQuizById",
    async (quizId, { rejectWithValue }) => {
        try {
            const response = await getQuizQuestions(quizId);
            return response;
        } catch (err) {
            return rejectWithValue(err.message || "Failed to Load Quiz");
        }
    }
);

const quizSlice = createSlice({
    name: "quiz",
    initialState: {
        questions: [],
        loading: false,
        error: null,
    },

    reducers: {

        clearQuestions(state) {
            state.questions = [];
        }

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuizById.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
            })
            .addCase(fetchQuizById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }

})

export const { clearQuestions } = quizSlice.actions;
export default quizSlice.reducer;