import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
    searchArticlesAsync, 
    addArticleAsync, 
    deleteArticleAsync, 
    editArticleAsync,
    getArticleAsync 
} from '../api/articlesApi';

const initialState = { 
    status: 'idle',
    articleSearchResults: [],
    showResults: false,
    searchQuery: {text: ""},
    viewingArticle: {},
    newArticle: {},
}

export const getArticle = createAsyncThunk(
    'articles/getArticle',
    async (data) => {
        const response = await getArticleAsync(data.id);
        return response;
    }
)

export const searchArticles = createAsyncThunk(
    'articles/searchArticles',
    async (query) => {
        const response = await searchArticlesAsync(query);
        return response;
    }
)

export const addArticle = createAsyncThunk(
    'articles/addArticle',
    async(article) => {
        const response = await addArticleAsync(article);
        return response.data;
    }
)

export const deleteArticle = createAsyncThunk(
    'articles/deleteArticle',
    async(data) => {
        await deleteArticleAsync(data.id);
    }
)

export const editArticle = createAsyncThunk(
    'articles/editArticle',
    async (data) => {
        await editArticleAsync(data);
        return data;
    }
)

const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        updateSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        clearSearchQuery: (state) => {
            state.searchQuery = {text: ""};
        },
        updateNewArticle: (state, action) => {
            state.newArticle = action.payload;
        },
        toggleShowResults: (state, action) => {
            state.showResults = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchArticles.fulfilled, (state, action) => {
                state.status = 'idle';
                state.articleSearchResults = action.payload;
            })
            .addCase(addArticle.fulfilled, (state) => {
                state.status = 'idle';
            })
            .addCase(deleteArticle.fulfilled, (state) => {
                state.viewingArticle = {};
            })
            .addCase(editArticle.fulfilled, (state, action) => {
                state.viewingArticle = action.payload;
            })
            .addCase(getArticle.fulfilled, (state, action) => {
                state.viewingArticle = action.payload;
            })
    }
})

export const { updateSearchQuery, clearSearchQuery, updateNewArticle, toggleShowResults } = articleSlice.actions
export default articleSlice.reducer 