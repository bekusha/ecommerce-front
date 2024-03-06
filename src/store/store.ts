import {configureStore} from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import nextReducer from "./slices/nextSlice"

export const store = configureStore({
    reducer : {
        products: productReducer,
        next: nextReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;