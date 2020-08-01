import { activeCurrenciesListState, CurrencyListActionTypes } from "./types";

const INITIAL_LIST_STATE: activeCurrenciesListState = {
  currencies: ["GBP", "EUR", "JPY", "DKK", "CAD", "SEK", "BTC", "ETH"],
};

export const activeCurrenciesListReducer = (
  state = INITIAL_LIST_STATE,
  action: CurrencyListActionTypes
): activeCurrenciesListState => {
  switch (action.type) {
    case "ADD_TO_CURRENCY_LIST":
      return {
        currencies: [action.payload, ...state.currencies],
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
    case "SWAP_IN_CURRENCY_LIST": {
      let newState = state.currencies;
      let a = newState[action.payload.from];
      newState[action.payload.from] = newState[action.payload.to];
      newState[action.payload.to] = a;

      return { currencies: newState };
    }
    default:
      return state;
  }
};
