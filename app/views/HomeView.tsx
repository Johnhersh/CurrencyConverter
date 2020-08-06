import React, { Fragment, useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  GestureResponderEvent,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { connect, ConnectedProps, useDispatch } from "react-redux";

import { RootState } from "../redux/rootReducer";
import {
  UpdateCurrencies,
  //  SwapInCurrencyList
} from "../redux/actions";

import {
  LongPressGestureHandler,
  LongPressGestureHandlerStateChangeEvent,
  LongPressGestureHandlerGestureEvent,
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
  // const indexOffset = useRef(0); // How far away from that card we've dragged so far
  let translateY = new Animated.Value(hoverStartLocation.current);

  let scrollRef = React.createRef<ScrollView>();
  let longPressRef = React.createRef<LongPressGestureHandler>();

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

  // let currentIndexOffset = 0; // Since handleGesture is called every tick, I declare this variable beforehand for performance
  // function handleGesture(event: PanGestureHandlerGestureEvent) {
  //   translateY.setValue(hoverStartLocation.current + event.nativeEvent.translationY);

  //   currentIndexOffset = Math.round(event.nativeEvent.translationY / CARD_HEIGHT);
  //   if (currentIndexOffset != indexOffset.current) {
  //     // If I'm here then user has dragged further than 1 card's distance away from origin

  //     dispatch(
  //       SwapInCurrencyList({
  //         from: hoverIndex.current + indexOffset.current,
  //         to: hoverIndex.current + currentIndexOffset,
  //       })
  //     );
  //     indexOffset.current = currentIndexOffset;
  //   }
  // }

  // function handleGestureStateChange(event: PanGestureHandlerStateChangeEvent) {
  //   if (event.nativeEvent.state == State.ACTIVE) {
  //     bHovering.current = true;
  //     if (bCanPickUp.current) {
  //       bCanPickUp.current = false;
  //       translateY.setValue(hoverStartLocation.current);
  //     }
  //   } else if (event.nativeEvent.state == State.END) {
  //     showHoverCard(false);
  //     setHoverName(""); // I want to reset the hover name because I hide the picked up card based on this name. Resetting it will unhide the card
  //     bHovering.current = false;
  //     currentIndexOffset = 0;
  //     indexOffset.current = 0;
  //   }
  // }

  // function onLongPress(
  //   event: GestureResponderEvent,
  //   currencyValue: string,
  //   currencyName: string,
  //   listIndex: number
  // ) {
  //   console.log(`Long Press`);
  //   hoverStartLocation.current = event.nativeEvent.pageY - CARD_HEIGHT * 2; // Note: I'm not sure why this 170 offset is needed

  //   hoverIndex.current = listIndex;

  //   showHoverCard(true);
  //   setHoverName(currencyName);
  //   setHoverValue(currencyValue);

  //   bCanPickUp.current = true;
  // }

  function onLongPressRelease() {
    console.log("abandoned");
    showHoverCard(false);
    // if (!bHovering.current) {
    //   showHoverCard(false);
    //   setHoverName("");
    // }
  }

  function onCardPressed(
    event: GestureResponderEvent,
    currencyValue: string,
    currencyName: string,
    listIndex: number
  ) {
    setHoverName(currencyName);
    setHoverValue(currencyValue);
  }

  function onScroll({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) {
    console.log(`Scrolling: ${nativeEvent.contentOffset.y}`);
    if (bShowHoverCard) {
      bHovering.current = true;
      translateY.setValue(hoverStartLocation.current - nativeEvent.contentOffset.y);
    }
  }

  function onLongPress({ nativeEvent }: LongPressGestureHandlerStateChangeEvent) {
    if (nativeEvent.state == State.ACTIVE) {
      console.log("Long Press");
      showHoverCard(true);
    }
    if (nativeEvent.state == State.END) {
      console.log("Released");
      showHoverCard(false);
      setHoverName(""); // This resets the opacity on the active card back to 1
    }
  }

  function onLongPressEvent({ nativeEvent }: LongPressGestureHandlerGestureEvent) {
    if (bShowHoverCard) {
      console.log(`Long Panning: ${nativeEvent.absoluteY}`);
      bHovering.current = true;
      translateY.setValue(nativeEvent.absoluteY - CARD_HEIGHT);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CurrencyStatusBar style="dark" />
        {bShowHoverCard && (
          <Animated.View style={[styles.hoverCardContainer, { top: translateY }]}>
            <CurrencyHoverCard currencyName={hoverName} currencyValue={hoverValue} />
          </Animated.View>
        )}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          onScroll={onScroll}
          ref={scrollRef}
          scrollEventThrottle={32}
          // disableScrollViewPanResponder={bShowHoverCard}
          // canCancelContentTouches={false}
          scrollEnabled={false}
        >
          <LongPressGestureHandler
            onHandlerStateChange={onLongPress}
            onGestureEvent={onLongPressEvent}
            ref={longPressRef}
            // simultaneousHandlers={panRef}
            // enabled={!bShowHoverCard}
          >
            <View style={styles.cardsContainer}>
              {/* {bShowHoverCard && (
                <Animated.View style={[styles.hoverCardContainer, { top: translateY }]}>
                  <CurrencyHoverCard currencyName={hoverName} currencyValue={hoverValue} />
                </Animated.View>
              )} */}
              <ReferenceCurrencyCard />
              {props.activeCurrenciesList.currencies.map((currency, index) => {
                return (
                  <CurrencyCard
                    key={currency}
                    currencyName={currency}
                    listIndex={index}
                    // onLongPress={onLongPress}
                    onInitialPress={onCardPressed}
                    opacity={hoverName == currency && bShowHoverCard ? 0 : 1}
                    bDisabled={bShowHoverCard}
                  />
                );
              })}
            </View>
          </LongPressGestureHandler>
        </ScrollView>
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
    overflow: "visible",
  },
  scrollContainer: {
    flex: 1,
    width: "80%",
    alignItems: "center",
  },
  cardsContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  hoverCardContainer: {
    width: "80%",
    alignItems: "center",
    top: 0,
    zIndex: 100,
    transform: [{ scaleX: 1.03 }],
    shadowRadius: 6,
    shadowOpacity: 50,
    shadowOffset: { width: 0, height: 4 },
  },
});
