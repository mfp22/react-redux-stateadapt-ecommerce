import { legacy_createStore as createStore } from "redux";

import cart from "./cart";

const store = createStore(cart);

export default store;
