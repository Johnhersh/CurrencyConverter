import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
} from "react-native";
import { connect, ConnectedProps, useDispatch } from "react-redux";

import { RootState } from "../redux/rootReducer";
import { UpdateCurrencies, SwapInCurrencyList } from "../redux/actions";

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
  const hoverStartLocation = useRef(0);
  // TODO: Name the offset variables something better. It's confusing even now.
  /** The initial index of the card we picked up */
  const hoverIndex = useRef(0);
  /** Where on the screen we started dragging from */
  const initialDragLocation = useRef(0);
  /** The new actual new index that will be live when card is dropped */
  const newIndexSlot = useRef(0);
  /** How many cards away we are from where card was picked up */
  const liveIndexOffset = useRef(0);
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

  function onCardPressed(currencyValue: string, currencyName: string, listIndex: number) {
    setHoverName(currencyName);
    setHoverValue(currencyValue);
    hoverIndex.current = listIndex;
  }

  function onHoverScroll({ nativeEvent }: LongPressGestureHandlerGestureEvent) {
    if (bShowHoverCard) {
      translateY.setValue(nativeEvent.absoluteY - CARD_HEIGHT);
      if (initialDragLocation.current == 0) initialDragLocation.current = nativeEvent.absoluteY;

      liveIndexOffset.current = Math.round(
        (initialDragLocation.current - nativeEvent.absoluteY) / 75
      );

      if (liveIndexOffset.current != newIndexSlot.current) {
        // If I'm here then user has dragged further than 1 card's distance away from origin

        dispatch(
          SwapInCurrencyList({
            from: hoverIndex.current - newIndexSlot.current,
            to: hoverIndex.current - liveIndexOffset.current,
          })
        );
        newIndexSlot.current = liveIndexOffset.current;
      }
    }
  }

  function onLongPressStateChange({ nativeEvent }: LongPressGestureHandlerStateChangeEvent) {
    if (nativeEvent.state == State.ACTIVE) {
      console.log("Long Press");
      showHoverCard(true);
    }
    if (nativeEvent.state == State.END) {
      console.log("Released");
      showHoverCard(false);
      setHoverName(""); // This resets the opacity on the active card back to 1
      liveIndexOffset.current = 0;
      newIndexSlot.current = 0;
      initialDragLocation.current = 0;
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
          ref={scrollRef}
          scrollEventThrottle={32}
          scrollEnabled={false}
        >
          <LongPressGestureHandler
            onHandlerStateChange={onLongPressStateChange}
            onGestureEvent={onHoverScroll}
            ref={longPressRef}
          >
            <View style={styles.cardsContainer}>
              <ReferenceCurrencyCard />
              {props.activeCurrenciesList.currencies.map((currency, index) => {
                return (
                  <CurrencyCard
                    key={currency}
                    currencyName={currency}
                    listIndex={index}
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
