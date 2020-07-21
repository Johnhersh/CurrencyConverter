import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { connect, ConnectedProps, useStore } from "react-redux";
import { RootState } from "../redux/rootReducer";

import { currencySymbols, currencyNames } from "../redux/types";

const currencyIcons: { [name: string]: any } = {
  USD: require("../../assets/CurrencyIcons/USD.png"),
  EUR: require("../../assets/CurrencyIcons/EUR.png"),
  GBP: require("../../assets/CurrencyIcons/GBP.png"),
  JPY: require("../../assets/CurrencyIcons/JPY.png"),
  DKK: require("../../assets/CurrencyIcons/DKK.png"),
  SEK: require("../../assets/CurrencyIcons/SEK.png"),
  CAD: require("../../assets/CurrencyIcons/CAD.png"),
};

interface PropsBuiltIn {
  currencyName: string;
}

const CurrencyCard = ({ currencyName = "USD", currenciesState, referenceCurrencyState }: Props) => {
  const store = useStore();
  const currencySymbol = currencySymbols[currencyName];

  // Doing this because currencyValue will be undefined until the values get propagated into the state:
  let currencyValue = "100";
  if (currenciesState.currencies[currencyName])
    currencyValue = (
      currenciesState.currencies[currencyName] * referenceCurrencyState.referenceMultiplier
    ).toFixed(3);
  const valueFontSize = 18 - referenceCurrencyState.referenceMultiplier.toString().length; // I want the text to shrink slightly with the amount of digits

  function onPress() {
    store.dispatch({
      type: "ADD_TO_CURRENCY_LIST",
      payload: referenceCurrencyState.referenceName,
    });
    store.dispatch({
      type: "REMOVE_FROM_CURRENCY_LIST",
      payload: currencyName,
    });
    store.dispatch({
      type: "UPDATE_REFERENCE_CURRENCY",
      payload: {
        referenceCurrencySymbol: currencySymbol,
        referenceName: currencyName,
        referenceMultiplier: currencyValue,
      },
    });
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.currencyContainer}>
        <Image source={currencyIcons[currencyName]} style={styles.imageContainer} />
        <View style={styles.currencyLongNameContainer}>
          <Text style={{ fontSize: 20 }}>{currencyName}</Text>
          <Text>{currencyNames[currencyName]}</Text>
        </View>
      </View>
      <View style={styles.valuesContainer}>
        <Text style={{ fontSize: valueFontSize }}>{currencySymbol + " " + currencyValue}</Text>
      </View>
    </TouchableOpacity>
  );
};

function mapStateToProps(state: RootState): RootState {
  return {
    ...state,
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & PropsBuiltIn;

export default connector(CurrencyCard);

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
  valuesContainer: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 10,
  },
});
