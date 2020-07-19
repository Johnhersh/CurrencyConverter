export const UPDATE_CURRENCIES = "UPDATE_CURRENCIES";
export const UPDATE_REFERENCE = "UPDATE_REFERENCE_CURRENCY";

export const ADD_TO_CURRENCY_LIST = "ADD_TO_CURRENCY_LIST";
export const REMOVE_FROM_CURRENCY_LIST = "ADD_TO_CURRENCY_LIST";

// Currency List:
interface currencyListItem {
  currencySymbol: string;
  currencyName: string;
}

export interface currencyListState {
  currencies: currencyListItem[];
}

interface AddToCurrencyList {
  type: typeof ADD_TO_CURRENCY_LIST;
  payload: currencyListItem;
}
interface RemoveFromCurrencyList {
  type: typeof REMOVE_FROM_CURRENCY_LIST;
  payload: currencyListItem;
}

// Currencies Data:
export interface currenciesDataState {
  currencies: { [currency: string]: number };
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
