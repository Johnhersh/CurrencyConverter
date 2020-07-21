import React, { useRef } from "react";
import { TextInput, StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { connect, ConnectedProps, useStore } from "react-redux";
import { RootState } from "../redux/rootReducer";

const ReferenceCurrencyCard = ({ referenceCurrencyState }: Props) => {
  const textInput = useRef<TextInput>(null);
  const store = useStore();

  function onChangeText(newText: string) {
    store.dispatch({
      type: "UPDATE_REFERENCE_CURRENCY",
      payload: {
        referenceCurrencySymbol: referenceCurrencyState.referenceCurrencySymbol,
        referenceName: referenceCurrencyState.referenceName,
        referenceMultiplier: parseFloat(newText),
      },
    });
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        textInput.current?.focus();
      }}
    >
      <View style={styles.container}>
        <Text>{referenceCurrencyState.referenceCurrencySymbol}</Text>
        <TextInput
          value={referenceCurrencyState.referenceMultiplier.toString()}
          ref={textInput}
          style={styles.textInputStyle}
          keyboardType={"numeric"}
          onChangeText={(text) => onChangeText(text)}
        />
        <Text>{referenceCurrencyState.referenceName}</Text>
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
    marginVertical: 5,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#adadad",
    backgroundColor: "lightblue",
  },
  textInputStyle: {
    flex: -1,
  },
});
