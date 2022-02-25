import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategoriesAsync, addCategoryAsync, deleteCategoryAsync, editCategoryAsync } from '../api/categoriesApi';

const initialState = { 
    values: [],
    status: 'idle',
}

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await fetchCategoriesAsync();
        return response.data
    }
)

export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (category) => {
        const response = await addCategoryAsync(category);
        return response.data;
    }
)

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (data) => {
        await deleteCategoryAsync(data.id);
        return data.index;
    }
)

export const editCategory = createAsyncThunk(
    'categories/editCategory',
    async (data) => {
        await editCategoryAsync(data.category);
        return data;
    }
)

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
      builder
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = 'idle';
            state.values = action.payload;
        })
        .addCase(addCategory.fulfilled, (state, action) => {
            state.status = 'idle';
            let newCategory = action.payload;
            console.log(action);
            state.values = [...state.values, newCategory];
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            let currArr = [...state.values];
            if (action.payload == 0) {
                currArr.shift();
            } else {
                currArr.splice(action.payload, 1);
            }
            state.values = currArr;
        })
        .addCase(editCategory.fulfilled, (state, action) => {
            let currArr = [...state.values];
            currArr[action.payload.index] = action.payload.category;
            state.values = currArr;
        })
  }
})

export const {  } = categorySlice.actions
export default categorySlice.reducer 