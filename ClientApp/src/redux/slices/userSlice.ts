import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IUserState {
    isShopper: boolean;
}

const initialState: IUserState = {
    isShopper: true
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleShopper: state => {
            state.isShopper = !state.isShopper;
        },
        setShopperTrue: state => {
            state.isShopper = true;
        },
        setShopperFalse: state => {
            state.isShopper = false;
        }
    }
});

const userSelector = (state: RootState) => state.user;

export {
    userSelector
}

export const { toggleShopper, setShopperTrue, setShopperFalse } = userSlice.actions;

export default userSlice.reducer;