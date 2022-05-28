import { Provider } from "react-redux";
import Cart from "./Cart";

import store from "./store";

const App = () => (
  <Provider store={store}>
    <Cart />
  </Provider>
);

export default App;
