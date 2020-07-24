// Will probably delete this file. Ended up not needing to combine the reducers.
// Keeping for reference in case I decide to add more reducers in the future

import { combineReducers } from "redux";

import { currencyDataReducer, referenceCurrencyReducer } from "./currencyReducer";
import { activeCurrenciesListReducer } from "./currencyListReducer";

export const rootReducers = combineReducers({
  currencyList: activeCurrenciesListReducer,
  currenciesDataState: currencyDataReducer,
  referenceCurrencyState: referenceCurrencyReducer,
});

export type RootState = ReturnType<typeof rootReducers>;
