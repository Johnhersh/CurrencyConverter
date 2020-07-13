import { createStore } from "redux";

import currencyReducer from "./currencyReducer";

export interface currenciesState {
  currencies: { [currency: string]: number };
}

const store = createStore(currencyReducer);

export default store;
