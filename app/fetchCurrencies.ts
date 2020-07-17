const currencyURL = "https://api.exchangeratesapi.io/latest?";

export async function getCurrencyFromApi(referenceCurrencyName: string) {
  console.log("Fetching: " + currencyURL + "base=" + referenceCurrencyName);
  try {
    let response = await fetch(currencyURL + "base=" + referenceCurrencyName, {
      method: "GET",
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
