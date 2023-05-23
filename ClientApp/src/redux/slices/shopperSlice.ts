import { createSlice } from "@reduxjs/toolkit";
import { IOrder } from "./orderSlice";
import { IProduct } from "./productSlice";
import { IReview } from "./reviewSlice"

export interface IShopperState {
    shopper: IShopper;
    token: string;
}

export interface IShopper {
    id: string;
    email?: string;
    firstName: string;
    lastName: string;
    interests?: string[];
    reviews: IReview[];
    orders: IOrder[];
    cart: IProduct;
}

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

            if (token === null || token === undefined || token === '') {
                state.token = null;
                return;
            }

            state.token = token;
        },
    }
});



// export const {
//     shopperSelector: 
// };

export const { logIn, logOut, getToken } = shopperSlice.actions;

export default shopperSlice.reducer;