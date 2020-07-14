import { createStore } from "redux";

import currencyReducer from "./currencyReducer";

const store = createStore(currencyReducer);

export default store;
