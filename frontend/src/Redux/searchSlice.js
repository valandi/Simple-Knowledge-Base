import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
    searchQuery: {text: ""},
}

export const generalSearch = createAsyncThunk(
    'search/generalSearch',
    async (data) => {
        const reponse = await generalSearchAsync(data);
        return response;
    }
)

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: () => {},
})

export const {} = searchSlice.actions;
export default searchSlice.reducer;