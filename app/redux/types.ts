export const UPDATE_CURRENCIES = "UPDATE_CURRENCIES";

export interface currenciesState {
  currencies: { [currency: string]: number };
}

export interface UpdateCurrencies {
  type: typeof UPDATE_CURRENCIES;
  payload: currenciesState;
}

export type CurrencyActionTypes = UpdateCurrencies;
