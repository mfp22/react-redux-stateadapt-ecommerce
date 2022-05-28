import { Provider } from "react-redux";

import store from "./store";

const App = () => (
  <Provider store={store}>
    <h1>Vite App</h1>
  </Provider>
);

export default App;
