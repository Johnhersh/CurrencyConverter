import { currenciesDataState, UpdateCurrencies, UPDATE_CURRENCIES } from "./types";

export function updateCurrencies(newCurrencies: currenciesDataState): UpdateCurrencies {
  return {
    type: UPDATE_CURRENCIES,
    payload: newCurrencies,
  };
}
