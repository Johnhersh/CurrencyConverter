import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
  LayoutAnimation,
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
import CurrencyStatusBar, { STATUSBAR_HEIGHT } from "../components/CurrencyStatusBar";
import CurrencyCard, { InitialPressParams, CARD_HEIGHT } from "../components/CurrencyCard";
import CurrencyHoverCard from "../components/CurrencyHoverCard";
import ReferenceCurrencyCard from "../components/ReferenceCurrencyCard";

const HomeView = (props: Props) => {
  const dispatch = useDispatch();
  const [bShowHoverCard, showHoverCard] = useState(false);
  const [hoverName, setHoverName] = useState("USD");
  const [hoverValue, setHoverValue] = useState("0");
  const hoverCardScale = useRef(new Animated.Value(1));
  const hoverStartLocation = useRef(0);
  /** The initial index of the card we picked up */
  const hoverIndex = useRef(0);
  /** Where on the screen we started dragging from */
  const initialDragLocation = useRef(0);
  /** The new actual new index that will be live when card is dropped */
  const newIndexSlot = useRef(0);
  /** How many cards away we are from where card was picked up */
  const liveIndexOffset = useRef(0);
  const translateY = useRef(new Animated.Value(hoverStartLocation.current));

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

  useEffect(() => {
    hoverCardScale.current.setValue(1);
    Animated.timing(hoverCardScale.current, {
      toValue: 1.03,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [bShowHoverCard]);

  function onCardPressed({ currencyValue, currencyName, listIndex }: InitialPressParams) {
    setHoverName(currencyName);
    setHoverValue(currencyValue);
    hoverIndex.current = listIndex;
  }

  function onHoverScroll({ nativeEvent }: LongPressGestureHandlerGestureEvent) {
    if (bShowHoverCard) {
      if (initialDragLocation.current == 0) {
        initialDragLocation.current = nativeEvent.absoluteY;
        translateY.current.setValue(nativeEvent.absoluteY - CARD_HEIGHT - STATUSBAR_HEIGHT / 2); // Gotta set initial location, otherwise the Animated.timing below will cause card to appear to snap into place
      }

      Animated.timing(translateY.current, {
        toValue: nativeEvent.absoluteY - CARD_HEIGHT - STATUSBAR_HEIGHT / 2,
        duration: 0,
        useNativeDriver: true,
      }).start();

      liveIndexOffset.current = Math.round(
        (initialDragLocation.current - nativeEvent.absoluteY) / 75
      );

      if (liveIndexOffset.current != newIndexSlot.current) {
        // If I'm here then user has dragged further than 1 card's distance away from origin
        const from = hoverIndex.current - newIndexSlot.current;
        const to = hoverIndex.current - liveIndexOffset.current;
        const fromIsWithinRange = from >= 0 && from < props.activeCurrenciesList.currencies.length;
        const toIsWithinRange = to >= 0 && to < props.activeCurrenciesList.currencies.length;

        if (fromIsWithinRange && toIsWithinRange) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

          dispatch(
            SwapInCurrencyList({
              from: from,
              to: to,
            })
          );

          newIndexSlot.current = liveIndexOffset.current;
        }
      }
    }
  }

  function onLongPressStateChange({ nativeEvent }: LongPressGestureHandlerStateChangeEvent) {
    if (nativeEvent.state == State.ACTIVE) {
      if (hoverName != "") showHoverCard(true);
    }
    if (nativeEvent.state == State.END) {
      showHoverCard(false);
      setHoverName(""); // This resets the opacity on the active card back to 1
      liveIndexOffset.current = 0;
      newIndexSlot.current = 0;
      initialDragLocation.current = 0;
      translateY.current.setOffset(0);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CurrencyStatusBar style="dark" />
        {bShowHoverCard && (
          <Animated.View
            style={[
              styles.hoverCardContainer,
              {
                transform: [{ scaleX: hoverCardScale.current }, { translateY: translateY.current }],
              },
            ]}
          >
            <CurrencyHoverCard currencyName={hoverName} currencyValue={hoverValue} />
          </Animated.View>
        )}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          ref={scrollRef}
          scrollEventThrottle={32}
          scrollEnabled={!bShowHoverCard}
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
    zIndex: 100,
    transform: [{ scaleX: 1.03 }],
    shadowRadius: 6,
    shadowOpacity: 50,
    shadowOffset: { width: 0, height: 4 },
  },
});
