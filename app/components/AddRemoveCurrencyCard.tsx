import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { currencyNames, currencyIcons } from "../currencyDefinitions";

interface PropsBuiltIn {
  currencyName: string;
}

const AddRemoveCurrencyCard = ({ currencyName = "USD" }: PropsBuiltIn) => {
  function onPress() {}

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.currencyContainer}>
        <Image source={currencyIcons[currencyName]} style={styles.imageContainer} />
        <View style={{ flex: 1 }} />
        <View style={styles.currencyLongNameContainer}>
          <Text style={{ fontSize: 20 }}>{currencyName}</Text>
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
    paddingVertical: 10,
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
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
});
