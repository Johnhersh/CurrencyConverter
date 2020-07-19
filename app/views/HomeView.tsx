import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { connect, ConnectedProps, useStore } from "react-redux";

import { RootState } from "../redux/rootReducer";

import { getCurrencyFromApi } from "../fetchCurrencies";
import CurrencyCard from "../components/CurrencyCard";
import ReferenceCurrencyCard from "../components/ReferenceCurrencyCard";

interface StatusBarProps {
  style: "auto" | "inverted" | "light" | "dark" | undefined;
}

const MyStatusBar = ({ ...props }: StatusBarProps) => (
  <View style={styles.statusBar}>
    <StatusBar translucent={true} hidden={false} {...props} />
  </View>
);

const HomeView = (props: Props) => {
  const store = useStore();

  useEffect(() => {
    getCurrencyFromApi(props.referenceCurrencyState.referenceName).then((rates) => {
      store.dispatch({
        type: "UPDATE_CURRENCIES",
        payload: { currencies: rates.rates },
      });
    });
  }, [props.referenceCurrencyState.referenceCurrencySymbol]);

  return (
    <View style={styles.container}>
      <MyStatusBar style="dark" />
      <View style={styles.cardsContainer}>
        <ReferenceCurrencyCard />
        {props.currencyList.currencies.map((currency) => {
          return <CurrencyCard key={currency} currencyName={currency} />;
        })}
      </View>
    </View>
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

const STATUSBAR_HEIGHT = Platform.OS === "web" ? 0 : 50;

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
    width: "60%",
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    width: "100%",
    backgroundColor: "white",
  },
});
