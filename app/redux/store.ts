import { createStore } from "redux";

// import rootReducer from "./rootReducer";
import currencyReducer from "./currencyReducer";

export interface currency {
  currency: string;
  value: number;
}

export interface currenciesState {
  currencies: currency[];
}

// const store = createStore(rootReducer);
const store = createStore(currencyReducer);

export default store;
