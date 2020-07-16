import { createStore } from "redux";

// import { currencyReducer } from "./currencyReducer";
import { rootReducers } from "./rootReducer";

const store = createStore(rootReducers);

export default store;
