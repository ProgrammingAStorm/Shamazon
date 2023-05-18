import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleLoggedIn: state => {
            state.isLoggedIn = !state.isLoggedIn;
        }
    }
});

export const { toggleLoggedIn } = userSlice.actions;

export default userSlice.reducer;