import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTagsAsync, addTagAsync, editTagAsync, deleteTagAsync } from '../api/tagsApi';

const initialState = { 
    values: [],
    status: 'idle',
}

export const fetchTags = createAsyncThunk(
    'tags/featchTags',
    async () => {
        const response = await fetchTagsAsync();
        return response.data;
    }
)

export const addTag = createAsyncThunk(
    'tags/addTag',
    async (tag) => {
      const response = await addTagAsync(tag);
      return response.data;
    }
)

export const deleteTag = createAsyncThunk(
    'tags/deleteTag',
    async (data) => {
      await deleteTagAsync(data.id);
      return data.index;
    }
)
export const editTag = createAsyncThunk(
    'tags/editTag',
    async (data) => {
        await editTagAsync(data.tag);
        return data;
    }
)

const tagSlice = createSlice({
    name: 'tags',
    initialState,
    extraReducers: (builder) => {
        builder
          .addCase(fetchTags.fulfilled, (state, action) => {
              state.status = 'idle';
              console.log(action);
              state.values = action.payload;
          })
          .addCase(addTag.fulfilled, (state, action) => {
              state.status = 'idle';
              let newTag = action.payload;
              state.values = [...state.values, newTag];
          })
          .addCase(deleteTag.fulfilled, (state, action) => {
              let currArr = [...state.values];
              if (action.payload == 0) {
                  currArr.shift();
              } else {
                  currArr.splice(action.payload, 1);
              }
              state.values = currArr;
          })
          .addCase(editTag.fulfilled, (state, action) => {
              let currArr = [...state.values];
              currArr[action.payload.index] = action.payload.tag;
              state.values = currArr;
          })
    }
  })
  
  export const {  } = tagSlice.actions
  export default tagSlice.reducer 