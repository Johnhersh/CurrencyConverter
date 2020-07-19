import { currencyListState, CurrencyListActionTypes } from "./types";

const INITIAL_LIST_STATE: currencyListState = {
  currencies: [{ currencySymbol: "$", currencyName: "USD" }],
};

export const currencyListReducer = (
  state = INITIAL_LIST_STATE,
  action: CurrencyListActionTypes
): currencyListState => {
  switch (action.type) {
    case "ADD_TO_CURRENCY_LIST":
      return {
        currencies: [
          ...state.currencies,
          {
            currencySymbol: action.payload.currencySymbol,
            currencyName: action.payload.currencyName,
          },
        ],
      };
    default:
      return state;
  }
};
