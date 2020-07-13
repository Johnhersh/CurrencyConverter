import { currenciesState } from "./store";

const UPDATE_CURRENCIES = "UPDATE_CURRENCIES";

interface UpdateCurrencies {
  type: typeof UPDATE_CURRENCIES;
  payload: currenciesState;
}

export type CurrencyActionTypes = UpdateCurrencies;

export function updateCurrencies(newCurrencies: currenciesState): UpdateCurrencies {
  return {
    type: UPDATE_CURRENCIES,
    payload: newCurrencies,
  };
}
