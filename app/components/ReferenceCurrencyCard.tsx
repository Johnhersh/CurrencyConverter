import React, { useRef } from "react";
import { View, TextInput, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { connect, ConnectedProps, useStore } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { CARD_HEIGHT } from "./CurrencyCard";

const ReferenceCurrencyCard = ({ referenceCurrencyState }: Props) => {
  const textInput = useRef<TextInput>(null);
  const store = useStore();

  // Doing this because sometimes the value can be blank, represented by "0"
  let textValue = "";
  if (!isNaN(referenceCurrencyState.referenceMultiplier))
    textValue = referenceCurrencyState.referenceMultiplier.toString();
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
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          textInput.current?.focus();
        }}
      >
        <LinearGradient
          style={styles.gradientContainer}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: "80%",
    maxHeight: CARD_HEIGHT,
    marginVertical: 5,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#adadad",
    backgroundColor: "white",
    display: "flex",
    marginHorizontal: 2,
    overflow: "hidden",
  },
  gradientContainer: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputStyle: {
    flex: -1,
    alignItems: "center",
    justifyContent: "center",
  },
});
