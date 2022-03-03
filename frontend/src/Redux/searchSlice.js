import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generalSearchAsync } from '../api/searchApi';

/* 
searchQuery: {
    text,
    category, 
    tags,
    isZendesk,
    isTrello,
}
*/

const initialState = {
    articleResults: [],
    zendeskResults: [],
    trelloResults: [],
    showResults: false,
    isZendesk: true,
    isTrello: false,
    searchQuery: {text: ""},
}

export const generalSearch = createAsyncThunk(
    'search/generalSearch',
    async (data, thunkAPI) => {
        const { searchQuery, isZendesk, isTrello } = thunkAPI.getState()['search'];
        const body = {
            searchQuery,
            isZendesk,
            isTrello,
        };
        const response = await generalSearchAsync(body);
        return response.data;
    }
)

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        clearSearchQuery: (state) => {
            state.searchQuery = {text: ""};
        },
        toggleShowResults: (state, action) => {
            state.showResults = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(generalSearch.fulfilled, (state, action) => {
                state.articleResults = action.payload.articles;
                if (state.isZendesk) {
                    state.zendeskResults = action.payload.tickets;
                }
                if (state.isTrello) {
                    state.trelloResults = action.payload.trellos;
                }
            })
    },
})

export const {updateSearchQuery, clearSearchQuery, toggleShowResults } = searchSlice.actions;
export default searchSlice.reducer;