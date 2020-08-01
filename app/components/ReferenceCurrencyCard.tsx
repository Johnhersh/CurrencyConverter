import React, { useRef } from "react";
import { TextInput, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { connect, ConnectedProps, useStore } from "react-redux";
import { RootState } from "../redux/rootReducer";

const ReferenceCurrencyCard = ({ referenceCurrencyState }: Props) => {
  const textInput = useRef<TextInput>(null);
  const store = useStore();

  // Doing this because sometimes the value can be blank, represented by "0"
  let textValue = referenceCurrencyState.referenceMultiplier.toString();
  if (textValue === "0") textValue = "";

  function onChangeText(newText: string) {
    let newValue = parseFloat(newText);
    if (newText.length == 0) newValue = 0;
    store.dispatch({
      type: "UPDATE_REFERENCE_CURRENCY",
      payload: {
        referenceCurrencySymbol: referenceCurrencyState.referenceCurrencySymbol,
        referenceName: referenceCurrencyState.referenceName,
        referenceMultiplier: newValue,
      },
    });
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        textInput.current?.focus();
      }}
    >
      <LinearGradient
        style={styles.container}
        colors={["#4E91FF", "#00B4FF"]}
        start={[0.5, 1]}
        end={[0.5, 0]}
      >
        <Text>{referenceCurrencyState.referenceCurrencySymbol + " "}</Text>
        <TextInput
          value={textValue}
          ref={textInput}
          style={styles.textInputStyle}
          keyboardType={"numeric"}
          onChangeText={(text) => onChangeText(text)}
        />
        <Text>{" " + referenceCurrencyState.referenceName}</Text>
      </LinearGradient>
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
    borderColor: "#4E91FF",
    backgroundColor: "lightblue",
    width: "95%",
  },
  textInputStyle: {
    flex: -1,
    alignItems: "center",
    justifyContent: "center",
  },
});
