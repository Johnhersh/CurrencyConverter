import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from "react-native";
// import { FontAwesome5 } from "@expo/vector-icons";

import { connect, ConnectedProps, useDispatch } from "react-redux";
import { RootState } from "../redux/rootReducer";
import {
  AddToCurrencyList,
  RemoveFromCurrencyList,
  UpdateReferenceCurrency,
} from "../redux/actions";

import { currencySymbols, currencyNames, currencyIcons } from "../currencyDefinitions";

export const CARD_HEIGHT = 70;

export interface InitialPressParams {
  currencyValue: string;
  currencyName: string;
  listIndex: number;
}

/** Props interface */
interface PropsBuiltIn {
  currencyName: string;
  listIndex: number;
  onInitialPress: (params: InitialPressParams) => void;
  opacity: number;
  bDisabled: boolean;
}

const CurrencyCard = ({
  currencyName = "USD",
  listIndex,
  currenciesDataState,
  referenceCurrencyState,
  onInitialPress,
  opacity,
  bDisabled,
}: Props) => {
  const currencySymbol = currencySymbols[currencyName];
  const translateY = useRef(new Animated.Value(75 + listIndex * 75)).current;
  const dispatch = useDispatch();
  const valueFontSize = 18 - referenceCurrencyState.referenceMultiplier.toString().length * 0.5; // I want the text to shrink slightly with the amount of digits

  // Doing this because currencyValue will be undefined until the values get propagated into the state:
  let currencyValue = "";
  if (currenciesDataState.currencies[currencyName]) {
    currencyValue = (
      currenciesDataState.currencies[currencyName] * referenceCurrencyState.referenceMultiplier
    ).toFixed(3);
  }

  useEffect(() => {
    translateY.setValue(75 + listIndex * 75); // Since I'm using a ref for translateY, it needs to be updated when the listIndex changes
  }, [listIndex]);

  function onPress() {
    dispatch(AddToCurrencyList(referenceCurrencyState.referenceName));
    dispatch(RemoveFromCurrencyList(currencyName));
    dispatch(
      UpdateReferenceCurrency({
        referenceCurrencySymbol: currencySymbol,
        referenceName: currencyName,
        referenceMultiplier: parseFloat(currencyValue),
      })
    );
  }

  function onPressIn() {
    console.log(`Pressed in`);
    onInitialPress({ currencyValue, currencyName, listIndex });
  }

  // function processLongPress(event: GestureResponderEvent) {
  //   onLongPress(event, currencyValue, currencyName, listIndex);
  // }

  return (
    <View style={[styles.container, { opacity: opacity }]}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
        onPressIn={onPressIn}
        // onLongPress={processLongPress}
        // onPressOut={onLongPressRelease}
        disabled={bDisabled}
        delayPressOut={100} // This is needed because handleGestureStateChange in HomeView may not happen immediately, so PressOut could override it
      >
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
    </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: "95%", // Leaving 5% gap to expand when the user picks up a card
    maxHeight: CARD_HEIGHT,
    marginVertical: 5,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#adadad",
    backgroundColor: "white",
  },
  touchable: {
    flex: 1,
    height: "100%", // Adding this to get full coverage for click detection
    flexDirection: "row",
    alignItems: "center",
  },
  currencyContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
  gripContainer: {
    paddingRight: 10,
  },
});
