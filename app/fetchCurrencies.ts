import { currenciesDataState } from "./redux/types";

const currencyURL = "https://api.exchangeratesapi.io/latest?base=";
const cryptoCurrencyURL = "https://api.coingecko.com/api/v3/simple/price?ids=";

const cryptoCurrencyNames: { [name: string]: string } = {
  BTC: "bitcoin",
  ETH: "ethereum",
};

export function getCurrenciesFromApi(referenceCurrencyName: string): currenciesDataState {
  let newRates: currenciesDataState = { currencies: {} };
  if (referenceCurrencyName == "BTC") {
  } else {
    let currencyRates = getCurrencyFromAPI(referenceCurrencyName);
    currencyRates.then((rates) => {
      newRates.currencies = rates.rates;
    });
    let cryptoRates = getCryptoCurrenciesFromAPI(referenceCurrencyName);
    cryptoRates.then((rates) => {
      newRates.currencies["BTC"] = rates.bitcoin.usd;
    });
  }
  return newRates;
}

async function getCurrencyFromAPI(referenceCurrencyName: string): Promise<any> {
  try {
    let response = await fetch(currencyURL + referenceCurrencyName, {
      method: "GET",
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

async function getCryptoCurrenciesFromAPI(referenceCurrencyName: string): Promise<any> {
  let url =
    cryptoCurrencyURL + cryptoCurrencyNames["BTC"] + "&vs_currencies=" + referenceCurrencyName;
  try {
    let response = await fetch(url, {
      method: "GET",
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
