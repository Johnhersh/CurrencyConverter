import React, { useEffect, useState } from "react";
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, Animated } from "react-native";
import { connect, ConnectedProps, useDispatch } from "react-redux";

import { RootState } from "../redux/rootReducer";
import { UpdateCurrencies } from "../redux/actions";

import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  PanGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler";

import { getCurrenciesFromApi, getCryptoCurrenciesFromApi } from "../fetchCurrencies";
import CurrencyStatusBar from "../components/CurrencyStatusBar";
import CurrencyCard from "../components/CurrencyCard";
import CurrencyHoverCard from "../components/CurrencyHoverCard";
import ReferenceCurrencyCard from "../components/ReferenceCurrencyCard";

const HomeView = (props: Props) => {
  const dispatch = useDispatch();
  const [bIsPickedUp, setPickedUp] = useState(false);
  let translateY = new Animated.Value(-75);

  useEffect(() => {
    if (["BTC", "ETH"].includes(props.referenceCurrencyState.referenceName)) {
      getCryptoCurrenciesFromApi(
        props.activeCurrenciesList.currencies,
        props.referenceCurrencyState.referenceName
      ).then((newRates) => {
        dispatch(UpdateCurrencies(newRates));
      });
    } else {
      // Using a .then because we have to wait to dispatch until all the values are propagated
      getCurrenciesFromApi(props.referenceCurrencyState.referenceName).then((newRates) => {
        dispatch(UpdateCurrencies(newRates));
      });
    }
  }, [props.referenceCurrencyState.referenceName]);

  let CurrencyCards = props.activeCurrenciesList.currencies.map((currency, index) => {
    return <CurrencyCard key={currency} currencyName={currency} listIndex={index} />;
  });

  function handleGesture(event: PanGestureHandlerGestureEvent) {
    // console.log(event.nativeEvent.absoluteY);
    translateY.setValue(event.nativeEvent.absoluteY - 150);
  }

  function handleGestureStateChange(event: PanGestureHandlerStateChangeEvent) {
    if (event.nativeEvent.state == State.ACTIVE) {
      console.log("Picking up");
      setPickedUp(true);
    } else if (event.nativeEvent.state == State.END) {
      console.log("Setting down");
      setPickedUp(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CurrencyStatusBar style="dark" />
        <PanGestureHandler
          onGestureEvent={handleGesture}
          onHandlerStateChange={handleGestureStateChange}
        >
          <View style={styles.cardsContainer}>
            <ReferenceCurrencyCard />
            {bIsPickedUp && (
              <Animated.View style={[styles.hoverCardContainer, { top: translateY }]}>
                <CurrencyHoverCard currencyName={"USD"} />
              </Animated.View>
            )}

            {CurrencyCards}
          </View>
        </PanGestureHandler>
      </View>
    </TouchableWithoutFeedback>
  );
};

function mapStateToProps(state: RootState): RootState {
  return {
    ...state,
  };
}

const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector>;

export default connector(HomeView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  cardsContainer: {
    flex: 1,
    width: "80%",
    alignItems: "center",
  },
  hoverCardContainer: {
    width: "100%",
    alignItems: "center",
    top: 0,
    zIndex: 100,
  },
});
