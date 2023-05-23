import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopper: null,
    token: null
}

export const shopperSlice = createSlice({
    name: 'shopper',
    initialState,
    reducers: {
        logIn: (state, action) => {
            const { shopper, token } = action.payload;

            state.shopper = shopper;
            state.token = token;

            localStorage.setItem('shopperToken', JSON.stringify(token));
        },
        logOut: state => {
            state.shopper = null;
            state.token = null;

            localStorage.setItem('shopperToken', '');
        },
        getToken: state => {
            const token = JSON.parse(localStorage.getItem('shopperToken')!);

            if(token === null || token === undefined || token === '') {
                state.token = null;
                return;
            }

            state.token = token;
        },
    }
});

export const { logIn, logOut, getToken } = shopperSlice.actions;

export default shopperSlice.reducer;