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
    case "REMOVE_FROM_CURRENCY_LIST": {
      let newState = state.currencies;
      for (let i = 0; i < newState.length; i++) {
        if (newState[i] === action.payload) {
          newState.splice(i, 1);
        }
      }
      return { currencies: newState };
    }
    default:
      return state;
  }
};
