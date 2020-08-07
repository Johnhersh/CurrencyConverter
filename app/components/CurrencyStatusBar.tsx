import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

interface StatusBarProps {
  style: "auto" | "inverted" | "light" | "dark" | undefined;
}

const CurrencyStatusBar = ({ ...props }: StatusBarProps) => (
  <View style={styles.statusBar}>
    <StatusBar translucent={true} hidden={false} {...props} />
  </View>
);

export default CurrencyStatusBar;

export const STATUSBAR_HEIGHT = Platform.OS === "web" ? 0 : 50;

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
    width: "80%",
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    width: "100%",
    backgroundColor: "white",
  },
});
