import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { connect, ConnectedProps, useStore } from "react-redux";

import { RootState } from "../redux/rootReducer";

const ManageCurrenciesView = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>Manage Currencies View</Text>
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
