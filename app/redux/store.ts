import { createStore } from "redux";

import currencyReducer from "./currencyReducer";

export interface currency {
  currency: string;
  value: number;
}

export interface currenciesState {
  currencies: currency[];
}

const store = createStore(currencyReducer);

export default store;
