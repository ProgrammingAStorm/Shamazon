import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IOrder } from "./orderSlice";
import { IProduct } from "./productSlice";

export interface ISellerState {
    seller: ISeller | null;
    token: string | null;
}

export interface ISeller {
    Id: string;
    Email: string | null;
    Name: string;
    Orders: IOrder[];
    Products: IProduct[]
}

const initialState: ISellerState = {
    seller: null,
    token: null
}

export const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {
        sellerLogIn: (state, action: PayloadAction<ISellerState>) => {
            const { seller, token } = action.payload;

            state.seller = seller;
            state.token = token;

            localStorage.setItem('sellerToken', JSON.stringify(token));
        },
        sellerLogOut: state => {
            state.seller = null;
            state.token = null;

            localStorage.setItem('sellerToken', '');
        }
    }
});

export const { sellerLogIn, sellerLogOut } = sellerSlice.actions;

export default sellerSlice.reducer;

const sellerSelector = (state: RootState) => state.seller

export {
    sellerSelector 
};
