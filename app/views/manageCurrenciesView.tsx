import React from "react";
import { StyleSheet, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../redux/rootReducer";

import AddRemoveCurrencyCard from "../components/AddRemoveCurrencyCard";
import CurrencyStatusBar from "../components/CurrencyStatusBar";
import { currencyNames } from "../currencyDefinitions";

const ManageCurrenciesView = (props: Props) => {
  return (
    <View style={styles.container}>
      <CurrencyStatusBar style="dark" />
      {Object.keys(currencyNames).map((currency, index) => {
        return <AddRemoveCurrencyCard key={index} currencyName={currency} />;
      })}
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

export default connector(ManageCurrenciesView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
