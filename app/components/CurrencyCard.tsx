import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  PanGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler";

import { connect, ConnectedProps, useDispatch } from "react-redux";
import { RootState } from "../redux/rootReducer";
import {
  AddToCurrencyList,
  RemoveFromCurrencyList,
  UpdateReferenceCurrency,
  SwapInCurrencyList,
} from "../redux/actions";

import { currencySymbols, currencyNames, currencyIcons } from "../currencyDefinitions";

// Props interface *********************************
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
  const indexOffset = useRef(0);
  const displayIndex = useRef(listIndex);
  const bIsPickedUp = useRef(false);
  const widthValue = useRef(1); // Saving width value in ref so it doesn't get reset when swapping
  const valueFontSize = 18 - referenceCurrencyState.referenceMultiplier.toString().length * 0.5; // I want the text to shrink slightly with the amount of digits

  // Doing this because currencyValue will be undefined until the values get propagated into the state:
  let currencyValue = "";
  if (currenciesDataState.currencies[currencyName]) {
    currencyValue = (
      currenciesDataState.currencies[currencyName] * referenceCurrencyState.referenceMultiplier
    ).toFixed(3);
  }

  useEffect(() => {
    if (bIsPickedUp.current == false) {
      Animated.timing(translateY, {
        duration: 200,
        toValue: (listIndex - displayIndex.current) * 75,
        useNativeDriver: true,
      }).start();
      displayIndex.current = listIndex;
      console.log(`To ${displayIndex.current}`);
    }
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

  /** Handle dragging section */
  let translateY = new Animated.Value(0);
  translateY.setOffset(75 + 75 * displayIndex.current);
  function handleGesture(event: PanGestureHandlerGestureEvent) {
    let translationY = event.nativeEvent.translationY;
    Animated.timing(translateY, {
      duration: 0,
      toValue: translationY,
      useNativeDriver: true,
    }).start();

    translationY = Math.round(translationY / 75); // How many slots away we've gone since picked up
    if (Math.round(indexOffset.current) != translationY) {
      indexOffset.current = translationY;
      dispatch(
        SwapInCurrencyList({
          from: listIndex,
          to: displayIndex.current + translationY,
        })
      );
    }
  }

  /** Expand card when picked up section */
  let width = new Animated.Value(widthValue.current);
  function handleGestureStateChange(event: PanGestureHandlerStateChangeEvent) {
    if (event.nativeEvent.state == State.ACTIVE) {
      bIsPickedUp.current = true;
      widthValue.current = 1.03;
      Animated.timing(width, {
        duration: 200,
        toValue: widthValue.current,
        useNativeDriver: true,
      }).start();
    }
    if (event.nativeEvent.state == State.END) {
      bIsPickedUp.current = false;
      widthValue.current = 1;
      width.setValue(widthValue.current);
      Animated.timing(translateY, {
        duration: 200,
        toValue: (listIndex - displayIndex.current) * 75,
        useNativeDriver: true,
      }).start();
      displayIndex.current = listIndex;
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
    width: "95%", // Leaving 5% gap to expand when the user picks up a card
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
