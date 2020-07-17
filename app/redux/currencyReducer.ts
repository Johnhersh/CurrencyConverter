import {
  currenciesState,
  CurrencyActionTypes,
  ReferenceActionType,
  referenceCurrency,
} from "./types";

const INITIAL_STATE: currenciesState = {
  currencies: { USD: 100, GBP: 50 },
};

export const currencyReducer = (
  state = INITIAL_STATE,
  action: CurrencyActionTypes
): currenciesState => {
  switch (action.type) {
    case "UPDATE_CURRENCIES":
      return {
        currencies: action.payload.currencies,
      };
    default:
      return state;
  }
};

const INITIAL_REFERENCE_STATE: referenceCurrency = {
  referenceCurrency: "$",
  referenceName: "USD",
};

export const referenceCurrencyReducer = (
  state = INITIAL_REFERENCE_STATE,
  action: ReferenceActionType
): referenceCurrency => {
  switch (action.type) {
    case "UPDATE_REFERENCE_CURRENCY":
      return action.payload;
    default:
      return state;
  }
};
