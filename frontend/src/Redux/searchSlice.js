import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchZDOptionsAsync, generalSearchAsync } from '../api/searchApi';

/* 
searchQuery: {
    text,
    category, 
    tags,
    isZendesk,
    isTrello,
    zendeskQuery: {
        sdkTag,
        gridProviderTag,
        TopicTag,
    }
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
    zendeskQuery: {},
    zendeskSearchOptions: {},
    didFetchOptions: false,
}

export const generalSearch = createAsyncThunk(
    'search/generalSearch',
    async (data, thunkAPI) => {
        const { searchQuery, isZendesk, isTrello, zendeskQuery } = thunkAPI.getState()['search'];
        const body = {
            searchQuery,
            isZendesk,
            isTrello,
            zendeskQuery
        };
        const response = await generalSearchAsync(body);
        return response.data;
    }
)

export const fetchZDOptions = createAsyncThunk(
    'search/fetchZDOptions',
    async (data, thunkAPI) => {
        const response = await fetchZDOptionsAsync();
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
            state.zendeskQuery = {};
        },
        updateZendeskQuery: (state, action) => {
            state.zendeskQuery = action.payload;
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
            .addCase(fetchZDOptions.fulfilled, (state, action) => {
                state.zendeskSearchOptions = action.payload;
                state.didFetchOptions = true;
            })
    },
})

export const {updateSearchQuery, clearSearchQuery, toggleShowResults, toggleZendesk, toggleTrello, updateZendeskQuery } = searchSlice.actions;
export default searchSlice.reducer;