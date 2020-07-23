import { currenciesDataState } from "./redux/types";

const currencyURL = "https://api.exchangeratesapi.io/latest?base=";
const cryptoCurrencyURL = "https://api.coingecko.com/api/v3/simple/price?ids=";

const cryptoCurrencyNames: { [name: string]: string } = {
  BTC: "bitcoin",
  ETH: "ethereum",
};

export async function getCurrenciesFromApi( // Returning a promise here because I don't want to actually dispatch the new rates until I have all the info
  referenceCurrencyName: string
): Promise<currenciesDataState> {
  let newRates: currenciesDataState = { currencies: {} };

  let url = currencyURL + referenceCurrencyName;
  let currencyRates = await getCurrencyFromAPI(url);
  newRates.currencies = currencyRates.rates;

  url =
    cryptoCurrencyURL +
    cryptoCurrencyNames["BTC"] +
    "," +
    cryptoCurrencyNames["ETH"] +
    "&vs_currencies=" +
    referenceCurrencyName.toLowerCase();
  let cryptoRates = await getCurrencyFromAPI(url);

  newRates.currencies = {
    ...newRates.currencies,
    ["BTC"]: 1 / cryptoRates.bitcoin[referenceCurrencyName.toLowerCase()], // The cryptocurrency API sends the currencies in lower-case unfortunately
    ["ETH"]: 1 / cryptoRates.ethereum[referenceCurrencyName.toLowerCase()],
  };

  return newRates;
}

export async function getCryptoCurrenciesFromApi(
  currencyList: string[],
  referenceCurrency: string
): Promise<currenciesDataState> {
  let newRates: currenciesDataState = { currencies: {} };
  const cryptoName = cryptoCurrencyNames[referenceCurrency];
  let url = cryptoCurrencyURL + cryptoName + "&vs_currencies=";
  currencyList.forEach((currency) => {
    url += currency.toLowerCase() + ",";
  });
  let cryptoRates = await getCurrencyFromAPI(url);

  for (const currency in cryptoRates[cryptoName]) {
    // The object returned from the API will have either an 'ethereum' or 'bitcoin' object inside. So I need to look up either ethereum/bitcoin dynamically
    newRates.currencies[currency.toUpperCase()] = cryptoRates[cryptoName][currency]; // Since the properties come from the crypto API in lowercase, I need to convert them to uppercase:
  }

  return newRates;
}

async function getCurrencyFromAPI(URL: string): Promise<any> {
  try {
    let response = await fetch(URL, {
      method: "GET",
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
