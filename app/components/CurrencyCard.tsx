import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

interface Props {
  currencySymbol: string;
  value: number;
}

const CurrencyCard: React.FC<Props> = ({ currencySymbol = "$", value = 0 }) => {
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
        <Text>{currencySymbol + value.toFixed(3)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 70,
    marginHorizontal: 2,
    marginVertical: 1,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#adadad",
  },
  currencyContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  valuesContainer: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 10,
  },
});

export default CurrencyCard;
