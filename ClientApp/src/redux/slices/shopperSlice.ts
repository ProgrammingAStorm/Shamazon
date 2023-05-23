import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    shopper: null,
    token: null
}

export const shopperSlice = createSlice({
    name: 'shopper',
    initialState,
    reducers: {
        toggleLoggedIn: state => {
            state.isLoggedIn = !state.isLoggedIn;
        },
        logIn: (state, action) => {
            const { shopper, token } = action.payload;

            state.shopper = shopper;
            state.token = token;
            state.isLoggedIn = true;

            localStorage.setItem('shopperToken', JSON.stringify(shopper));
        },
        logOut: state => {
            state.shopper = null;
            state.token = null;
            state.isLoggedIn = false;

            localStorage.setItem('shopperToken', '');
        },
        getToken: state => {
            const token = JSON.parse(localStorage.getItem('shopperToken')!);

            if(token === null || token === undefined || token === '') {
                state.token = null;
                return;
            }

            state.token = token;
            toggleLoggedIn();
        },
    }
});

export const { toggleLoggedIn, logIn, logOut, getToken } = shopperSlice.actions;

export default shopperSlice.reducer;