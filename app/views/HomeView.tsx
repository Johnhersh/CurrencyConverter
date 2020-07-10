import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";

import CurrencyCard from "../components/CurrencyCard";

export default function HomeView() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.cardsContainer}>
        <CurrencyCard currencySymbol="$" value={100} />
        <CurrencyCard currencySymbol="£" value={800} />
      </View>
    </View>
  );
}

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
});
