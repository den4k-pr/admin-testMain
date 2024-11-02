import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Вказуємо ID поста безпосередньо
const POST_ID = '6724e7815e95b723d38b7cd3';

export const fetchPost = createAsyncThunk(
    'post/fetchPost',
    async () => {
        const response = await fetch(`https://admin-test-jet.vercel.app/api/posts/${POST_ID}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
);

const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: null,
        loading: false,
        error: null,
    },
    reducers: {
        updatePost: (state, action) => {
            state.post = action.payload; // Оновлюємо пост за новими даними
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.loading = false;
                state.post = action.payload;
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.loading = false;
                // @ts-ignore
                state.error = action.error.message;
            });
    },
});

export const { updatePost } = postSlice.actions; // Експортуємо функцію оновлення
export default postSlice.reducer;
