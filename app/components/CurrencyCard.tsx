import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function CurrencyCard() {
  return (
    <View style={styles.container}>
      <View style={styles.currencyContainer}>
        <Image
          source={{
            uri: "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-250.png",
          }}
          style={styles.imageContainer}
        />
      </View>
      <View style={styles.valuesContainer}>
        <Text>Currency values should go here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: "5em",
    marginHorizontal: "1em",
    marginVertical: "0.5em",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#adadad",
  },
  currencyContainer: {
    flex: 1,
    paddingLeft: "1em",
  },
  imageContainer: {
    width: "50px",
    height: "50px",
    borderRadius: 100,
  },
  valuesContainer: {
    flex: 1,
  },
});
