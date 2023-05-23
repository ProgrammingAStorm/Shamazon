import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IOrder } from "./orderSlice";
import { IProduct } from "./productSlice";
import { IReview } from "./reviewSlice"

export interface ISellerState {
    seller: ISeller | null;
    token: string | null;
}

export interface ISeller {
    id: string;
    email: string | null;
    firstName: string;
    lastName: string;
    interests: string[] | null;
    reviews: IReview[];
    orders: IOrder[];
    cart: IProduct;
}

const initialState: ISellerState = {
    seller: null,
    token: null
}

export const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<ISellerState>) => {
            const { seller, token } = action.payload;

            state.seller = seller;
            state.token = token;

            localStorage.setItem('sellerToken', JSON.stringify(token));
        },
        logOut: state => {
            state.seller = null;
            state.token = null;

            localStorage.setItem('sellerToken', '');
        },
        getToken: state => {
            const token = JSON.parse(localStorage.getItem('sellerToken')!);

            if (token === null || token === undefined || token === '') {
                state.token = null;
                return;
            }

            state.token = token;
        },
    }
});

export const { logIn, logOut, getToken } = sellerSlice.actions;

export default sellerSlice.reducer;

const sellerSelector = (state: RootState) => state.seller

export {
    sellerSelector 
};
