export const UPDATE_CURRENCIES = "UPDATE_CURRENCIES";
export const UPDATE_PRIME = "UPDATE_REFERENCE_CURRENCY";

export interface currenciesState {
  currencies: { [currency: string]: number };
}

export interface referenceCurrency {
  referenceCurrency: string;
  referenceName: string;
}

export interface UpdateCurrencies {
  type: typeof UPDATE_CURRENCIES;
  payload: currenciesState;
}

export interface UpdateRefrence {
  type: typeof UPDATE_PRIME;
  payload: referenceCurrency;
}

export type CurrencyActionTypes = UpdateCurrencies;
export type ReferenceActionType = UpdateRefrence;
