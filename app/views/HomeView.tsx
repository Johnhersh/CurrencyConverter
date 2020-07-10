import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import { getCurrencyFromApi } from "../fetchCurrencies";
import CurrencyCard from "../components/CurrencyCard";

interface StatusBarProps {
  style: "auto" | "inverted" | "light" | "dark" | undefined;
}

const MyStatusBar = ({ ...props }: StatusBarProps) => (
  <View style={styles.statusBar}>
    <StatusBar translucent={true} hidden={false} {...props} />
  </View>
);

export default function HomeView() {
  getCurrencyFromApi().then((rates) => {
    console.log("Rates: ");
    console.log(rates.rates);
  });

  return (
    <View style={styles.container}>
      <MyStatusBar style="dark" />
      <View style={styles.cardsContainer}>
        <CurrencyCard currencySymbol="$" value={100} />
        <CurrencyCard currencySymbol="£" value={800} />
      </View>
    </View>
  );
}

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
