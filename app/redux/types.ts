export const UPDATE_CURRENCIES = "UPDATE_CURRENCIES";
export const UPDATE_REFERENCE = "UPDATE_REFERENCE_CURRENCY";

export const ADD_TO_CURRENCY_LIST = "ADD_TO_CURRENCY_LIST";
export const REMOVE_FROM_CURRENCY_LIST = "REMOVE_FROM_CURRENCY_LIST";

export const currencySymbols: { [name: string]: string } = {
  USD: "$",
  GBP: "£",
  JPY: "¥",
  EUR: "€",
  DKK: "kr.",
  SEK: "kr",
  CAD: "$",
};

// Currency List:
export interface currencyListState {
  currencies: string[];
}

interface AddToCurrencyList {
  type: typeof ADD_TO_CURRENCY_LIST;
  payload: string;
}
interface RemoveFromCurrencyList {
  type: typeof REMOVE_FROM_CURRENCY_LIST;
  payload: string;
}

// Currencies Data:
export interface currenciesDataState {
  currencies: { [currencyName: string]: number };
}

export interface UpdateCurrencies {
  type: typeof UPDATE_CURRENCIES;
  payload: currenciesDataState;
}

// Reference currency:
export interface referenceCurrency {
  referenceCurrencySymbol: string;
  referenceName: string;
}

export interface UpdateRefrence {
  type: typeof UPDATE_REFERENCE;
  payload: referenceCurrency;
}

// Final exports:
export type CurrencyActionTypes = UpdateCurrencies;
export type CurrencyListActionTypes = AddToCurrencyList | RemoveFromCurrencyList;
export type ReferenceActionType = UpdateRefrence;
