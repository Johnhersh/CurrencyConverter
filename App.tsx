import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeView from "./app/views/HomeView";
import ManageCurrenciesView from "./app/views/manageCurrenciesView";

import store from "./app/redux/store";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="Home" component={HomeView} options={{ title: "Currency Converter" }} />
          <Tab.Screen
            name="Manage"
            component={ManageCurrenciesView}
            options={{ title: "Add/Remove Currencies" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
