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
    isZendesk: false,
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
            state.isTrello = false;
            state.isZendesk = false;
        },
        toggleShowResults: (state, action) => {
            state.showResults = action.payload;
        },
        toggleZendesk: (state, action) => {
            let curr = state.isZendesk;
            state.isZendesk = !curr;
        },
        toggleTrello: (state, action) => {
            let curr = state.isTrello;
            state.isTrello = !curr;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(generalSearch.fulfilled, (state, action) => {
                console.log(action.payload);
                state.articleResults = action.payload.articles;
                if (state.isZendesk) {
                    state.zendeskResults = action.payload.tickets;
                } else {
                    state.zendeskResults = [];
                }
                if (state.isTrello) {
                    state.trelloResults = action.payload.trellos;
                } else {
                    state.trelloResults = [];
                }
            })
    },
})

export const {updateSearchQuery, clearSearchQuery, toggleShowResults, toggleZendesk, toggleTrello } = searchSlice.actions;
export default searchSlice.reducer;