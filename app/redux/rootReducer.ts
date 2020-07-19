// Will probably delete this file. Ended up not needing to combine the reducers.
// Keeping for reference in case I decide to add more reducers in the future

import { combineReducers } from "redux";

import { currencyReducer, referenceCurrencyReducer } from "./currencyReducer";
import { currencyListReducer } from "./currencyListReducer";

export const rootReducers = combineReducers({
  currencyList: currencyListReducer,
  currenciesState: currencyReducer,
  referenceCurrencyState: referenceCurrencyReducer,
});

export type RootState = ReturnType<typeof rootReducers>;
