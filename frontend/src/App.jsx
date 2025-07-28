// App.jsx
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { store, persistor } from "./store/store.js";
import AppRoutes from "./AppRoutes.jsx";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
