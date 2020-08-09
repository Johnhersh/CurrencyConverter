import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Easing,
} from "react-native";

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
  cardDropIndex: number;
}

const CurrencyCard = ({
  currencyName = "USD",
  listIndex,
  currenciesDataState,
  referenceCurrencyState,
  onInitialPress,
  opacity,
  bDisabled,
  cardDropIndex,
}: Props) => {
  const currencySymbol = currencySymbols[currencyName];
  const dispatch = useDispatch();
  const valueFontSize = 18 - referenceCurrencyState.referenceMultiplier.toString().length * 0.5; // I want the text to shrink slightly with the amount of digits
  let scaleAnim = new Animated.Value(1);

  // Doing this because currencyValue will be undefined until the values get propagated into the state:
  let currencyValue = "";
  if (currenciesDataState.currencies[currencyName]) {
    currencyValue = (
      currenciesDataState.currencies[currencyName] * referenceCurrencyState.referenceMultiplier
    ).toFixed(3);
  }

  useEffect(() => {
    if (cardDropIndex >= 0 && cardDropIndex != listIndex) {
      const waveIndex = Math.abs(listIndex - cardDropIndex);
      scaleAnim.setValue(1);

      Animated.sequence([
        Animated.delay(100 * waveIndex * 0.7),
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          mass: 1 + waveIndex * 0.3,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [cardDropIndex]);

  function onPress() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
    onInitialPress({ currencyValue, currencyName, listIndex });
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: opacity },
        { transform: [{ scaleX: scaleAnim }, { scaleY: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
        onPressIn={onPressIn}
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
