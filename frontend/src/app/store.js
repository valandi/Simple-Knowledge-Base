import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../Components/counter/counterSlice';
import categoriesReducer from '../Redux/categoriesSlice';
import tagsReducer from '../Redux/tagsSlice';
import articlesReducer from '../Redux/articlesSlice'; 

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    categories: categoriesReducer,
    tags: tagsReducer,
    articles: articlesReducer
  },
});
