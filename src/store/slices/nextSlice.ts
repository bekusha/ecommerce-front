import { createSlice } from "@reduxjs/toolkit";

const initialState={
    productData: [],
    favoriteData:[],
    allProducts:[],
    userInfo: null
}

export const nextSlice = createSlice({
    name: 'next',
    initialState,
    reducers: {
        addToCart:(state, action) =>{
            state.productData = action.payload
        }
    }
})

export const {addToCart} = nextSlice.actions;
export default nextSlice.reducer