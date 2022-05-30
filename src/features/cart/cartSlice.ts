import { createSelector, createSlice } from "@reduxjs/toolkit";
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
    addProduct: (state) => {
      console.log("addProduct");
      state.items.push({
        price: Math.floor(Math.random() * 400) + 1,
      });
    },
    setShipping: (state) => {
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
const calculateTotal = createSelector(
  (state: any) => state.items,
  (items: any) => {
    console.log("triggering calculateTotal only when I change state items");
    return items.reduce((total: number, item: any) => total + item.price, 0);
  }
);

const calculateTotalWithShippingValue = createSelector(
  (state: any) => state.items,
  (state: any) => state.shipping_value,
  (items: any, shipping_value: number) => {
    console.log(
      "triggering calculateTotal only when I change state items or shipping_value"
    );
    return (
      items.reduce((total: number, item: any) => total + item.price, 0) +
      shipping_value
    );
  }
);

export { calculateTotal, calculateTotalWithShippingValue };

export default cartSlice.reducer;
