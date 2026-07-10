import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllQuestions } from "../../services/quizAPI";

export const fetchAllQuestion = createAsyncThunk(
    "allQuestion/fetchAllQuestion",
    //thunk is not taking any value, so we have to put a empty space on it
    async (_, { rejectWithValue }) => {
        try {
            return await getAllQuestions();
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

const allQuestionSlice = createSlice({
    name: "allQuestion",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllQuestion.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAllQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default allQuestionSlice.reducer