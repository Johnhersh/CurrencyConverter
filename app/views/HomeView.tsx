import React, { useEffect } from "react";
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { connect, ConnectedProps, useDispatch } from "react-redux";

import { RootState } from "../redux/rootReducer";
import { UpdateCurrencies } from "../redux/actions";

import { getCurrenciesFromApi, getCryptoCurrenciesFromApi } from "../fetchCurrencies";
import CurrencyStatusBar from "../components/CurrencyStatusBar";
import CurrencyCard from "../components/CurrencyCard";
import ReferenceCurrencyCard from "../components/ReferenceCurrencyCard";

const HomeView = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (["BTC", "ETH"].includes(props.referenceCurrencyState.referenceName)) {
      getCryptoCurrenciesFromApi(
        props.activeCurrenciesList.currencies,
        props.referenceCurrencyState.referenceName
      ).then((newRates) => {
        dispatch(UpdateCurrencies(newRates));
      });
    } else {
      // Using a .then because we have to wait to dispatch until all the values are propagated
      getCurrenciesFromApi(props.referenceCurrencyState.referenceName).then((newRates) => {
        dispatch(UpdateCurrencies(newRates));
      });
    }
  }, [props.referenceCurrencyState.referenceName]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CurrencyStatusBar style="dark" />
        <View style={styles.cardsContainer}>
          <ReferenceCurrencyCard />
          {props.activeCurrenciesList.currencies.map((currency) => {
            return <CurrencyCard key={currency} currencyName={currency} />;
          })}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

function mapStateToProps(state: RootState): RootState {
  return {
    ...state,
  };
}

const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector>;

export default connector(HomeView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  cardsContainer: {
    flex: 1,
    width: "80%",
  },
});
