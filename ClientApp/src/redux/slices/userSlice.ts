import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isShopper: true
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleShopper: state => {
            state.isShopper = !state.isShopper;
        },
    }
});

export const {toggleShopper} = userSlice.actions;

export default userSlice.reducer;