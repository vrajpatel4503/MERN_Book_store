import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";

// Step 1: Configure Redux Persist
const persistConfig = {
  key: "book-store-auth",
  storage,
};

// Step 2: Combine Reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Step 3: Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 4: Create Store
export const store = configureStore({
  reducer: persistedReducer,
});

// Step 5: Create Persistor
export const persistor = persistStore(store);
