import { createSlice } from "@reduxjs/toolkit";
import { buildAdapter, createSelectorsCache } from "@state-adapt/core";
import { mapToSelectorsWithCache } from "../../map-to-selectors-with-cache.function";
import { AppDispatch } from "../../store";

interface CartState {
  items: {
    price: number;
  }[];
  shipping_value: number;
}

const INITIAL_STATE: CartState = {
  items: [],
  shipping_value: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    ...INITIAL_STATE,
  },
  reducers: {
    addProduct: state => {
      console.log("addProduct");
      state.items.push({
        price: Math.floor(Math.random() * 400) + 1,
      });
    },
    setShipping: state => {
      state.shipping_value = Math.floor(Math.random() * 100) + 1;
    },
  },
});

export const { addProduct, setShipping } = cartSlice.actions;

// ex thunk
export const addProductAsync = () => (dispatch: AppDispatch) => {
  setTimeout(() => {
    dispatch(addProduct());
  }, 1000);
};

// selectors
const adapter = buildAdapter<CartState>()()({
  items: s => s.state.items,
  shippingCost: s => s.state.shipping_value,
})({
  total: s => {
    console.log("triggering calculateTotal only when I change state items");
    return s.items.reduce((total: number, item: any) => total + item.price, 0);
  },
})({
  totalWithShipping: s => {
    console.log(
      "triggering calculateTotal only when I change state items or shipping_value",
    );
    return s.total + s.shippingCost;
  },
})();

export const cartCache = createSelectorsCache();
export const selectors = mapToSelectorsWithCache(
  adapter.selectors,
  (state: any) => state.cart as CartState,
  cartCache,
);

export default cartSlice.reducer;
