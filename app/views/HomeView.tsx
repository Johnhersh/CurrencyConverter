import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";

import CurrencyCard from "../components/CurrencyCard";

export default function HomeView() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.cardsContainer}>
        <CurrencyCard />
        <CurrencyCard />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardsContainer: {
    flex: 1,
    width: "50%",
  },
});