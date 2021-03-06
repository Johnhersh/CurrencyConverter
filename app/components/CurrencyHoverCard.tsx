import React from "react";
import { StyleSheet, Text, View, Image, Animated } from "react-native";

import { currencySymbols, currencyNames, currencyIcons } from "../currencyDefinitions";

/** Props interface */
interface Props {
  currencyName: string;
  currencyValue: string;
}

const CurrencyHoverCard = ({ currencyName = "USD", currencyValue = "" }: Props) => {
  const currencySymbol = currencySymbols[currencyName];

  return (
    <Animated.View style={[styles.container]}>
      <View style={styles.currencyContainer}>
        <Image source={currencyIcons[currencyName]} style={styles.imageContainer} />
        <View style={styles.currencyLongNameContainer}>
          <Text style={{ fontSize: 20 }}>{currencyName}</Text>
          <Text>{currencyNames[currencyName]}</Text>
        </View>
      </View>
      <View style={styles.valuesContainer}>
        <Text style={{ fontSize: 18 }}>{currencySymbol + " " + currencyValue}</Text>
      </View>
    </Animated.View>
  );
};

export default CurrencyHoverCard;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: "95%", // Leaving 5% gap to expand when the user picks up a card
    maxHeight: 70,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#adadad",
    backgroundColor: "white",
  },
  currencyContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
    paddingLeft: 10,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 7,
  },
  currencyLongNameContainer: {
    flex: 2,
    justifyContent: "center",
    paddingLeft: 10,
  },
  valuesContainer: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 10,
  },
});
