import { currenciesState, UpdateCurrencies, UPDATE_CURRENCIES } from "./types";

export function updateCurrencies(newCurrencies: currenciesState): UpdateCurrencies {
  return {
    type: UPDATE_CURRENCIES,
    payload: newCurrencies,
  };
}
