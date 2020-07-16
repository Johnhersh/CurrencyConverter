import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { connect, ConnectedProps, useStore } from "react-redux";
import { RootState } from "../redux/rootReducer";

interface PropsBuiltIn {
  currencySymbol: string;
  value: number;
}

// const CurrencyCard: React.FC<Props> = ({ currencySymbol = "$", value = 0 }) => {
const CurrencyCard = ({ referenceCurrencyState, currencySymbol = "$", value = 0 }: Props) => {
  const store = useStore();
  function onPress() {
    store.dispatch({
      type: "UPDATE_REFERENCE_CURRENCY",
      payload: { referenceCurrency: currencySymbol },
    });
  }

  console.log(referenceCurrencyState.referenceCurrency);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.currencyContainer}>
        <Image
          source={{
            uri: "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-250.png",
          }}
          style={styles.imageContainer}
        />
      </View>
      <View style={styles.valuesContainer}>
        <Text>{currencySymbol + value.toFixed(3)}</Text>
      </View>
    </TouchableOpacity>
  );
};

function mapStateToProps(state: RootState): RootState {
  return {
    ...state,
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & PropsBuiltIn;

export default connector(CurrencyCard);

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
  },
  currencyContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  valuesContainer: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 10,
  },
});
