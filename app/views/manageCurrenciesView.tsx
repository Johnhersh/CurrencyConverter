import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import AddRemoveCurrencyCard from "../components/AddRemoveCurrencyCard";
import CurrencyStatusBar from "../components/CurrencyStatusBar";
import { currencyNames } from "../currencyDefinitions";

const ManageCurrenciesView = () => {
  return (
    <View style={styles.container}>
      <CurrencyStatusBar style="dark" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.cardsContainer}>
          {Object.keys(currencyNames).map((currency, index) => {
            return <AddRemoveCurrencyCard key={index} currencyName={currency} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ManageCurrenciesView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardsContainer: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
});
