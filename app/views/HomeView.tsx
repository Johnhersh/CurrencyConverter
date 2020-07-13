import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";

import { currenciesState } from "../redux/store";

// import { getCurrencyFromApi } from "../fetchCurrencies";
import CurrencyCard from "../components/CurrencyCard";

interface StatusBarProps {
  style: "auto" | "inverted" | "light" | "dark" | undefined;
}

const MyStatusBar = ({ ...props }: StatusBarProps) => (
  <View style={styles.statusBar}>
    <StatusBar translucent={true} hidden={false} {...props} />
  </View>
);

const HomeView = (props: Props) => {
  console.log("Props:");
  console.log(props.currencies);

  return (
    <View style={styles.container}>
      <MyStatusBar style="dark" />
      <View style={styles.cardsContainer}>
        <CurrencyCard currencySymbol="$" value={props.currencies["USD"]} />
        <CurrencyCard currencySymbol="$" value={props.currencies["GBP"]} />
      </View>
    </View>
  );
};

function mapStateToProps(state: currenciesState): currenciesState {
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
    width: "60%",
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    width: "100%",
    backgroundColor: "white",
  },
});
