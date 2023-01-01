import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {},
    },
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;
        },
        deleteUser: (state) => {
            state.value = {}
        }
    },
});

export const { setUser, deleteUser } = userSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = state => state.user.value;

export default userSlice.reducer;
