import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect, ConnectedProps, useStore } from "react-redux";
import { RootState } from "../redux/rootReducer";

const ReferenceCurrencyCard = ({ referenceCurrencyState }: Props) => {
  return (
    <View style={styles.container}>
      <Text>
        {referenceCurrencyState.referenceCurrency}1{referenceCurrencyState.referenceName}
      </Text>
    </View>
  );
};

function mapStateToProps(state: RootState): RootState {
  return {
    ...state,
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

export default connector(ReferenceCurrencyCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 70,
    marginHorizontal: 2,
    marginVertical: 1,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#adadad",
    backgroundColor: "lightblue",
  },
});
