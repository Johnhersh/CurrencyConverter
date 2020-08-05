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
import { UpdateCurrencies, SwapInCurrencyList } from "../redux/actions";

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
  const CARD_HEIGHT = 75;
  const dispatch = useDispatch();
  const [bShowHoverCard, showHoverCard] = useState(false);
  const [hoverName, setHoverName] = useState("USD");
  const [hoverValue, setHoverValue] = useState("0");
  const bCanPickUp = useRef(false);
  const bHovering = useRef(false);
  const hoverStartLocation = useRef(0);
  const hoverIndex = useRef(0); // The index of the card we're picking up
  const indexOffset = useRef(0); // How far away from that card we've dragged so far
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

  let currentIndexOffset = 0; // Since handleGesture is called every tick, I declare this variable beforehand for performance
  function handleGesture(event: PanGestureHandlerGestureEvent) {
    translateY.setValue(hoverStartLocation.current + event.nativeEvent.translationY);

    currentIndexOffset = Math.round(event.nativeEvent.translationY / CARD_HEIGHT);
    if (currentIndexOffset != indexOffset.current) {
      // If I'm here then user has dragged further than 1 card's distance away from origin

      dispatch(
        SwapInCurrencyList({
          from: hoverIndex.current + indexOffset.current,
          to: hoverIndex.current + currentIndexOffset,
        })
      );
      indexOffset.current = currentIndexOffset;
    }
  }

  function handleGestureStateChange(event: PanGestureHandlerStateChangeEvent) {
    if (event.nativeEvent.state == State.ACTIVE) {
      bHovering.current = true;
      if (bCanPickUp.current) {
        bCanPickUp.current = false;
        translateY.setValue(hoverStartLocation.current);
      }
    } else if (event.nativeEvent.state == State.END) {
      showHoverCard(false);
      setHoverName(""); // I want to reset the hover name because I hide the picked up card based on this name. Resetting it will unhide the card
      bHovering.current = false;
      currentIndexOffset = 0;
      indexOffset.current = 0;
    }
  }

  function onLongPress(
    event: GestureResponderEvent,
    currencyValue: string,
    currencyName: string,
    listIndex: number
  ) {
    hoverStartLocation.current = event.nativeEvent.pageY - CARD_HEIGHT * 2; // Note: I'm not sure why this 170 offset is needed

    hoverIndex.current = listIndex;

    showHoverCard(true);
    setHoverName(currencyName);
    setHoverValue(currencyValue);

    bCanPickUp.current = true;
  }

  function onLongPressRelease() {
    if (!bHovering.current) {
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

            {props.activeCurrenciesList.currencies.map((currency, index) => {
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
            })}
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
    transform: [{ scaleX: 1.03 }],
    shadowRadius: 6,
    shadowOpacity: 50,
    shadowOffset: { width: 0, height: 4 },
  },
});
