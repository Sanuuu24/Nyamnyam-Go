import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter((item) => item.id !== productId);
        },
        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;

            if (quantity <= 0) {
                state.items = state.items.filter(
                    (item) => item.id !== productId
                );
            } else {
                const item = state.items.find((item) => item.id === productId);
                if (item) {
                    item.quantity = quantity;
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
    cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => {
    const subtotal = state.cart.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
    const ppn = subtotal * 0.10;
    return {
        subtotal,
        ppn,
        total: subtotal 
    };
};
export const selectCartItemsCount = (state) => {
    return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

export default cartSlice.reducer;
