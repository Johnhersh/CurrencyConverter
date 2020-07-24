import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { currencyNames, currencyIcons } from "../currencyDefinitions";

interface PropsBuiltIn {
  currencyName: string;
}

const AddRemoveCurrencyCard = ({ currencyName = "USD" }: PropsBuiltIn) => {
  function onPress() {}

  const colorsOn = ["#4E91FF", "#00B4FF"];
  const colorsOff = ["#FFFFFF", "#EEEEEE"];

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        style={styles.gradientContainer}
        colors={colorsOff}
        start={[0.5, 1]}
        end={[0.5, 0]}
      >
        <Image source={currencyIcons[currencyName]} style={styles.imageContainer} />
        <View style={{ flex: 1 }} />
        <View style={styles.currencyLongNameContainer}>
          <Text style={{ fontSize: 20 }}>{currencyName}</Text>
          <Text>{currencyNames[currencyName]}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AddRemoveCurrencyCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    maxHeight: 70,
    marginVertical: 5,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#adadad",
    overflow: "hidden",
  },
  gradientContainer: {
    flex: -1, // Want this to fit the content
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
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
    marginLeft: 10,
  },
  currencyLongNameContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
});
