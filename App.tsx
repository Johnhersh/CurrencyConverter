import React from "react";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeView from "./app/views/HomeView";
import ManageCurrenciesView from "./app/views/ManageCurrenciesView";

import store from "./app/redux/store";

import { FontAwesome5 } from "@expo/vector-icons";

<FontAwesome5 name="list" size={24} color="black" />;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName = "";
              let iconColor = "black";

              if (route.name === "Home") {
                iconName = focused ? "money-bill-wave" : "money-bill-wave-alt";
                iconColor = focused ? "#00B4FF" : "black";
              } else if (route.name === "Manage") {
                iconName = "list";
                iconColor = focused ? "#00B4FF" : "black";
              }

              return <FontAwesome5 name={iconName} size={24} color={iconColor} />;
            },
          })}
        >
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
