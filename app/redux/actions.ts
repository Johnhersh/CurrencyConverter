import {
  CurrencyListActionTypes,
  ADD_TO_CURRENCY_LIST,
  REMOVE_FROM_CURRENCY_LIST,
  CurrencyActionTypes,
  UPDATE_CURRENCIES,
  SWAP_IN_CURRENCY_LIST,
  currenciesDataState,
  ReferenceActionType,
  referenceCurrency,
  UPDATE_REFERENCE,
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

export function SwapInCurrencyList(swapItems: {
  from: number;
  to: number;
}): CurrencyListActionTypes {
  return {
    type: SWAP_IN_CURRENCY_LIST,
    payload: swapItems,
  };
}

// Currencies Data:
export function UpdateCurrencies(newCurrenciesData: currenciesDataState): CurrencyActionTypes {
  return {
    type: UPDATE_CURRENCIES,
    payload: newCurrenciesData,
  };
}

// Reference Currency:
export function UpdateReferenceCurrency(
  newReferenceCurrency: referenceCurrency
): ReferenceActionType {
  return {
    type: UPDATE_REFERENCE,
    payload: newReferenceCurrency,
  };
}
