import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuizList } from "../../services/quizAPI";

export const fetchAllQuiz = createAsyncThunk(
    "quizList/fetchAllQuiz",
    //thunk is not taking any value, so we have to put a empty space on it
    async (_, { rejectWithValue }) => {
        try {
            return await getQuizList();
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

const quizListSlice = createSlice({
    name: "quizList",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllQuiz.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAllQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default quizListSlice.reducer