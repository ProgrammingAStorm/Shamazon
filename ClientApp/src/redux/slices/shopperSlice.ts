import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IOrder } from "./orderSlice";
import { IProduct } from "./productSlice";
import { IReview } from "./reviewSlice"

export interface IShopperState {
    shopper: IShopper | null;
    token: string | null;
}

export interface IShopper {
    id: string;
    email: string | null;
    firstName: string;
    lastName: string;
    interests: string[] | null;
    reviews: IReview[];
    orders: IOrder[];
    cart: IProduct;
}

const initialState: IShopperState = {
    shopper: null,
    token: null
}

export const shopperSlice = createSlice({
    name: 'shopper',
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<IShopperState>) => {
            const { shopper, token } = action.payload;

            state.shopper = shopper;
            state.token = token;

            localStorage.setItem('shopperToken', JSON.stringify(token));
        },
        logOut: state => {
            state.shopper = null;
            state.token = null;

            localStorage.setItem('shopperToken', '');
        }
    }
});

export const { logIn, logOut } = shopperSlice.actions;

export default shopperSlice.reducer;

const shopperSelector = (state: RootState) => state.shopper

export {
    shopperSelector 
};
