import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { connect, ConnectedProps, useStore } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import { RootState } from "../redux/rootReducer";
import { currencyNames, currencyIcons } from "../currencyDefinitions";

interface PropsBuiltIn {
  currencyName: string;
}

const AddRemoveCurrencyCard = ({ currencyName = "USD", activeCurrenciesList }: Props) => {
  const bIsActive = activeCurrenciesList.currencies.includes(currencyName);
  const store = useStore();

  function onPress() {
    if (bIsActive) {
      store.dispatch({
        type: "REMOVE_FROM_CURRENCY_LIST",
        payload: currencyName,
      });
    } else {
      store.dispatch({
        type: "ADD_TO_CURRENCY_LIST",
        payload: currencyName,
      });
    }
  }

  const colorsOn = ["#4E91FF", "#00B4FF"];
  const colorsOff = ["#FFFFFF", "#EEEEEE"];
  const colors = bIsActive ? colorsOn : colorsOff;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        style={styles.gradientContainer}
        colors={colors}
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

function mapStateToProps(state: RootState): RootState {
  return {
    ...state,
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & PropsBuiltIn;

export default connector(AddRemoveCurrencyCard);

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
