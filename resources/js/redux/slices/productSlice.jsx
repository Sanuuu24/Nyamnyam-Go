import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async () => {
        const response = await fetch("/api/product");
        const result = await response.json();
        return result.data;
    }
);

export const fetchProductTypes = createAsyncThunk(
    "product/fetchProductTypes",
    async () => {
        const response = await fetch("/api/product-type");
        const result = await response.json();
        return result.data;
    }
);

const initialState = {
    products: [],
    productTypes: [],
    selectedType: "all",
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSelectedType: (state, action) => {
            state.selectedType = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.productTypes = action.payload;
            })
            .addCase(fetchProductTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setSelectedType } = productSlice.actions;

export const selectProducts = (state) => state.product.products;
export const selectProductTypes = (state) => state.product.productTypes;
export const selectSelectedType = (state) => state.product.selectedType;
export const selectProductLoading = (state) => state.product.loading;
export const selectProductError = (state) => state.product.error;

export const selectFilteredProducts = (state) => {
    const products = selectProducts(state);
    const selectedType = selectSelectedType(state);

    return selectedType === "all"
        ? products
        : products.filter((item) => item.product_type_id === selectedType);
};

export default productSlice.reducer;
