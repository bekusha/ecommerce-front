import { Product } from '@/types/product';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
    const response = await fetch('http://localhost:8000/api/product/');
    return response.json();
});

export const fetchProductById = createAsyncThunk<Product, number>(
    'products/fetchProductById',
    async (productId, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:8000/api/product/${productId}/`);
        if (!response.ok) {
          throw new Error('Server responded with an error!');
        }
        const data = await response.json();
        console.log(data)
        return data;
      } catch (error) {
        return rejectWithValue('Failed to fetch product');
      }
    }
  );
  
  interface ProductsState {
    items: Product[];
    currentProduct: Product | null; 
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    currentProduct: null,
    status: "idle",
    error: null,
};


const productsSlice = createSlice({
    name: 'products',
   initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = null;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentProduct = action.payload; 
                state.error = null;
              })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error =  null;
            });
    },
});

export default productsSlice.reducer;
