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
            localStorage.removeItem('isShopper');
            localStorage.setItem('isShopper', !state.isShopper ? 'true' : 'false')
            state.isShopper = !state.isShopper;
        },
        setShopperTrue: state => {
            localStorage.removeItem('isShopper');
            localStorage.setItem('isShopper', 'true')
            state.isShopper = true;
        },
        setShopperFalse: state => {
            localStorage.removeItem('isShopper');
            localStorage.setItem('isShopper', 'false')
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