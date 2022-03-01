import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../Redux/categoriesSlice';
import tagsReducer from '../Redux/tagsSlice';
import articlesReducer from '../Redux/articlesSlice'; 
import errorsReducer from '../Redux/errorSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    tags: tagsReducer,
    articles: articlesReducer,
    errors: errorsReducer
  },
});