import { currenciesDataState } from "./redux/types";

const currencyURL = "https://api.exchangeratesapi.io/latest?base=";
const cryptoCurrencyURL = "https://api.coingecko.com/api/v3/simple/price?ids=";

const cryptoCurrencyNames: { [name: string]: string } = {
  BTC: "bitcoin",
  ETH: "ethereum",
};

// Returning a promise here because I don't want to actually dispatch the new rates until I have all the info
export async function getCurrenciesFromApi(
  referenceCurrencyName: string
): Promise<currenciesDataState> {
  let newRates: currenciesDataState = { currencies: {} };

  let currencyRates = await getCurrencyFromAPI(referenceCurrencyName);
  newRates.currencies = currencyRates.rates;

  let cryptoRates = await getCryptoCurrenciesFromAPI(referenceCurrencyName);
  newRates.currencies = { ...newRates.currencies, ["BTC"]: cryptoRates.bitcoin.usd };

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
