import { createAction, createSlice, Action, AnyAction } from '@reduxjs/toolkit';

const initialState = {
    errorMessage: "",
}

function isRejectedAction(action) {
    return action.type.endsWith('rejected')
}

const errorSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        updateErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isRejectedAction, (state, action) => {
                if (action.payload.msg)
                    state.errorMessage = action.payload.msg;
            })
    }
})

export const { updateErrorMessage } = errorSlice.actions;
export default errorSlice.reducer;