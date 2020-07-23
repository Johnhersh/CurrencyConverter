import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform, StyleSheet, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { connect, ConnectedProps, useStore } from "react-redux";

import { RootState } from "../redux/rootReducer";

import { getCurrenciesFromApi, getCryptoCurrenciesFromApi } from "../fetchCurrencies";
import CurrencyCard from "../components/CurrencyCard";
import ReferenceCurrencyCard from "../components/ReferenceCurrencyCard";

interface StatusBarProps {
  style: "auto" | "inverted" | "light" | "dark" | undefined;
}

const MyStatusBar = ({ ...props }: StatusBarProps) => (
  <View style={styles.statusBar}>
    <StatusBar translucent={true} hidden={false} {...props} />
  </View>
);

const HomeView = (props: Props) => {
  const store = useStore();

  useEffect(() => {
    if (["BTC", "ETH"].includes(props.referenceCurrencyState.referenceName)) {
      getCryptoCurrenciesFromApi(
        props.currencyList.currencies,
        props.referenceCurrencyState.referenceName
      ).then((newRates) => {
        store.dispatch({
          type: "UPDATE_CURRENCIES",
          payload: newRates,
        });
      });
    } else {
      // Using a .then because we have to wait to dispatch until all the values are propagated
      getCurrenciesFromApi(props.referenceCurrencyState.referenceName).then((newRates) => {
        store.dispatch({
          type: "UPDATE_CURRENCIES",
          payload: newRates,
        });
      });
    }
  }, [props.referenceCurrencyState.referenceName]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <MyStatusBar style="dark" />
        <View style={styles.cardsContainer}>
          <ReferenceCurrencyCard />
          {props.currencyList.currencies.map((currency) => {
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

const STATUSBAR_HEIGHT = Platform.OS === "web" ? 0 : 50;

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
  statusBar: {
    height: STATUSBAR_HEIGHT,
    width: "100%",
    backgroundColor: "white",
  },
});
