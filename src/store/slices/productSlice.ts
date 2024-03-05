import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('http://localhost:8000/api/product/')
    return response.json();
})

const productsSlice = createSlice({
    name:'products',
    initialState: {
        items:[],
        status: 'idle',
        error: null as string | null
    },
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(fetchProducts.pending, (state)=>{
            state.status = 'loading';
            state.error = null
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.items = action.payload;
            state.error = null; 
        })
        .addCase(fetchProducts.rejected,(state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? null; 
        })
    }
})

export default productsSlice.reducer