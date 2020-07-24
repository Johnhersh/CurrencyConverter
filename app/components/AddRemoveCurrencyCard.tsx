import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { currencyNames } from "../currencyDefinitions";

const currencyIcons: { [name: string]: any } = {
  USD: require("../../assets/CurrencyIcons/USD.png"),
  EUR: require("../../assets/CurrencyIcons/EUR.png"),
  GBP: require("../../assets/CurrencyIcons/GBP.png"),
  JPY: require("../../assets/CurrencyIcons/JPY.png"),
  DKK: require("../../assets/CurrencyIcons/DKK.png"),
  SEK: require("../../assets/CurrencyIcons/SEK.png"),
  CAD: require("../../assets/CurrencyIcons/CAD.png"),
  BTC: require("../../assets/CurrencyIcons/BTC.png"),
  ETH: require("../../assets/CurrencyIcons/ETH.png"),
};

interface PropsBuiltIn {
  currencyName: string;
}

const AddRemoveCurrencyCard = ({ currencyName = "USD" }: PropsBuiltIn) => {
  function onPress() {}

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.currencyContainer}>
        <Image source={currencyIcons[currencyName]} style={styles.imageContainer} />
        <View style={styles.currencyLongNameContainer}>
          <Text style={{ fontSize: 20 }}>{currencyName}</Text>
          <View style={{ flex: 1 }} />
          <Text>{currencyNames[currencyName]}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AddRemoveCurrencyCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 70,
    marginHorizontal: 2,
    marginVertical: 5,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#adadad",
  },
  currencyContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 2,
    paddingLeft: 10,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 7,
    backgroundColor: "blue",
  },
  currencyLongNameContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
  },
});
