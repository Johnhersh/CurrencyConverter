import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";

import { connect, ConnectedProps, useDispatch } from "react-redux";
import { RootState } from "../redux/rootReducer";
import {
  AddToCurrencyList,
  RemoveFromCurrencyList,
  UpdateReferenceCurrency,
} from "../redux/actions";

import { currencySymbols, currencyNames, currencyIcons } from "../currencyDefinitions";

interface PropsBuiltIn {
  currencyName: string;
  listIndex: number;
}

const CurrencyCard = ({
  currencyName = "USD",
  listIndex,
  currenciesDataState,
  referenceCurrencyState,
}: Props) => {
  const currencySymbol = currencySymbols[currencyName];
  const dispatch = useDispatch();

  // Doing this because currencyValue will be undefined until the values get propagated into the state:
  let currencyValue = "";
  if (currenciesDataState.currencies[currencyName]) {
    currencyValue = (
      currenciesDataState.currencies[currencyName] * referenceCurrencyState.referenceMultiplier
    ).toFixed(3);
  }
  const valueFontSize = 18 - referenceCurrencyState.referenceMultiplier.toString().length * 0.5; // I want the text to shrink slightly with the amount of digits

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

  let translateY = new Animated.Value(0);
  translateY.setOffset(75 + 75 * listIndex);
  let handleGesture = Animated.event([{ nativeEvent: { translationY: translateY } }], {
    useNativeDriver: true,
  });

  let width = new Animated.Value(1);
  function handleGestureStateChange(event: PanGestureHandlerStateChangeEvent) {
    if (event.nativeEvent.state == State.ACTIVE) {
      width.setValue(1.01);
    }
    if (event.nativeEvent.state == State.END) {
      width.setValue(1);
    }
  }

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: translateY }, { scaleX: width }] }]}
    >
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
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
      <PanGestureHandler
        onGestureEvent={handleGesture}
        onHandlerStateChange={handleGestureStateChange}
      >
        <Animated.View style={styles.gripContainer}>
          <FontAwesome5 name="grip-vertical" size={24} color="black" />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
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
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: "95%",
    maxHeight: 70,
    marginVertical: 5,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#adadad",
    backgroundColor: "white",
  },
  touchable: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  currencyContainer: {
    display: "flex",
    flexDirection: "row",
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
