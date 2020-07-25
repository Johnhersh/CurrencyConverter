import {
  CurrencyListActionTypes,
  ADD_TO_CURRENCY_LIST,
  REMOVE_FROM_CURRENCY_LIST,
  CurrencyActionTypes,
  UPDATE_CURRENCIES,
  currenciesDataState,
} from "./types";

// Active currency list actions:
export function AddToCurrencyList(newCurrency: string): CurrencyListActionTypes {
  return {
    type: ADD_TO_CURRENCY_LIST,
    payload: newCurrency,
  };
}

export function RemoveFromCurrencyList(newCurrency: string): CurrencyListActionTypes {
  return {
    type: REMOVE_FROM_CURRENCY_LIST,
    payload: newCurrency,
  };
}

// Currencies Data:
export function UpdateCurrencies(newCurrenciesData: currenciesDataState): CurrencyActionTypes {
  return {
    type: UPDATE_CURRENCIES,
    payload: newCurrenciesData,
  };
}
