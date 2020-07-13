import React from "react";
import { Provider } from "react-redux";

import HomeView from "./app/views/HomeView";

import store from "./app/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <HomeView />
    </Provider>
  );
}
