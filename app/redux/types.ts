export const UPDATE_CURRENCIES = "UPDATE_CURRENCIES";
export const UPDATE_REFERENCE = "UPDATE_REFERENCE_CURRENCY";

export const ADD_TO_CURRENCY_LIST = "ADD_TO_CURRENCY_LIST";
export const REMOVE_FROM_CURRENCY_LIST = "REMOVE_FROM_CURRENCY_LIST";

export const currencySymbols: { [name: string]: string } = {
  CAD: "$",
  ISK: "Íkr",
  DKK: "kr.",
  GBP: "£",
  SEK: "kr",
  JPY: "¥",
  CHF: "CHf",
  EUR: "€",
  USD: "$",
  AUD: "A$",
  ILS: "₪",
  BTC: "BTC",
  ETH: "ETH",
};

export const currencyNames: { [name: string]: string } = {
  CAD: "Canadian Dollar",
  ISK: "Icelandic Króna",
  DKK: "Danish Krone",
  GBP: "British Pound",
  SEK: "Swedish Krone",
  JPY: "Japanese Yen",
  CHF: "Swiss Franc",
  EUR: "EURO",
  USD: "US Dollar",
  AUD: "Australian Dollar",
  ILS: "Israeli Shekel",
  BTC: "Bitcoin",
  ETH: "Ethereum",
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
  referenceMultiplier: number;
}

export interface UpdateRefrence {
  type: typeof UPDATE_REFERENCE;
  payload: referenceCurrency;
}

// Final exports:
export type CurrencyActionTypes = UpdateCurrencies;
export type CurrencyListActionTypes = AddToCurrencyList | RemoveFromCurrencyList;
export type ReferenceActionType = UpdateRefrence;
