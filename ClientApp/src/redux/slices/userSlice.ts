import { createSlice } from "@reduxjs/toolkit";
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
    }
});

const userSelector = (state: RootState) => state.user;

export {
    userSelector
}

export const {toggleShopper} = userSlice.actions;

export default userSlice.reducer;