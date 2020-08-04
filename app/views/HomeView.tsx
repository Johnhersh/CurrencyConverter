import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  GestureResponderEvent,
} from "react-native";
import { connect, ConnectedProps, useDispatch } from "react-redux";

import { RootState } from "../redux/rootReducer";
import { UpdateCurrencies } from "../redux/actions";

import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  PanGestureHandlerGestureEvent,
  // LongPressGestureHandler,
  // LongPressGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";

import { getCurrenciesFromApi, getCryptoCurrenciesFromApi } from "../fetchCurrencies";
import CurrencyStatusBar from "../components/CurrencyStatusBar";
import CurrencyCard from "../components/CurrencyCard";
import CurrencyHoverCard from "../components/CurrencyHoverCard";
import ReferenceCurrencyCard from "../components/ReferenceCurrencyCard";

const HomeView = (props: Props) => {
  const dispatch = useDispatch();
  const [bShowHoverCard, showHoverCard] = useState(false);
  const [hoverName, setHoverName] = useState("USD");
  const [hoverValue, setHoverValue] = useState("0");
  const bCanPickUp = useRef(false);
  const bHovering = useRef(false);
  const hoverStartLocation = useRef(0);
  let translateY = new Animated.Value(hoverStartLocation.current);

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
    return (
      <CurrencyCard
        key={currency}
        currencyName={currency}
        listIndex={index}
        onLongPress={onLongPress}
        onLongPressRelease={onLongPressRelease}
        opacity={hoverName == currency ? 0 : 1}
      />
    );
  });

  function handleGesture(event: PanGestureHandlerGestureEvent) {
    // console.log(`Y: ${event.nativeEvent.translationY}`);
    translateY.setValue(hoverStartLocation.current + event.nativeEvent.translationY);
  }

  function handleGestureStateChange(event: PanGestureHandlerStateChangeEvent) {
    if (event.nativeEvent.state == State.ACTIVE) {
      bHovering.current = true;
      if (bCanPickUp.current) {
        console.log(`Picking up!`);
        bCanPickUp.current = false;
        translateY.setValue(hoverStartLocation.current);
      }
    } else if (event.nativeEvent.state == State.END) {
      console.log("Setting down");
      showHoverCard(false);
      setHoverName(""); // I want to reset the hover name because I hide the picked up card based on this name. Resetting it will unhide the card
      bHovering.current = false;
    }
  }

  function onLongPress(event: GestureResponderEvent, currencyValue: string, currencyName: string) {
    hoverStartLocation.current = event.nativeEvent.pageY - 170; // Note: I'm not sure why this 170 offset is needed

    showHoverCard(true);
    setHoverName(currencyName);
    setHoverValue(currencyValue);

    bCanPickUp.current = true;
  }

  function onLongPressRelease() {
    console.log(`Should abandon: ${bHovering.current}`);
    if (!bHovering.current) {
      console.log(`abandoned: ${hoverName}`);
      showHoverCard(false);
      setHoverName("");
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
            {bShowHoverCard && (
              <Animated.View style={[styles.hoverCardContainer, { top: translateY }]}>
                <CurrencyHoverCard currencyName={hoverName} currencyValue={hoverValue} />
              </Animated.View>
            )}

            {CurrencyCards}
          </View>
        </PanGestureHandler>
        {/* </Animated.View> */}
        {/* </LongPressGestureHandler> */}
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
    transform: [{ scaleX: 1.03 }],
  },
});
