import { currencyListState, CurrencyListActionTypes } from "./types";

const INITIAL_LIST_STATE: currencyListState = {
  currencies: ["GBP", "EUR", "JPY"],
};

export const currencyListReducer = (
  state = INITIAL_LIST_STATE,
  action: CurrencyListActionTypes
): currencyListState => {
  switch (action.type) {
    case "ADD_TO_CURRENCY_LIST":
      return {
        currencies: [...state.currencies, ...action.payload],
      };
    case "REMOVE_FROM_CURRENCY_LIST":
      return {
        currencies: state.currencies,
      };
    default:
      return state;
  }
};
