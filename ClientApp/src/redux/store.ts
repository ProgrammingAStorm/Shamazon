import { configureStore } from '@reduxjs/toolkit';

import shopperReducer from './slices/shopperSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        shopper: shopperReducer,
        user: userReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, shoppers: shoppersState}
export type AppDispatch = typeof store.dispatch