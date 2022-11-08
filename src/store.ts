import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { globalSelectorsCacheKey, stateSanitizer } from "@state-adapt/core";

import cartReducer, { cartCache } from "./features/cart/cartSlice";

const cacheChildren = (window as any)[globalSelectorsCacheKey]?.__children;
cacheChildren.cart = cartCache;

const store = configureStore({
  reducer: combineReducers({
    cart: cartReducer,
  }),
  devTools: {
    stateSanitizer: state =>
      stateSanitizer({
        ...state,
        adapt: {},
      }),
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
