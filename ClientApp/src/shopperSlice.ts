import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

export const shopperSlice = createSlice({
    name: 'shopper',
    initialState,
    reducers: {
        toggleLoggedIn: state => {
            state.isLoggedIn = !state.isLoggedIn;
        }
    }
});

export const { toggleLoggedIn } = shopperSlice.actions;

export default shopperSlice.reducer;