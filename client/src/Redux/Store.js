// This is store
import {
  legacy_createStore,
  combineReducers,
  applyMiddleware,
  compose
} from "redux";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage (localStorage)
import { AuthReducer } from "./Reducer/AuthReducer";

const rootReducer = combineReducers({
  AuthReducer: AuthReducer
});

// Redux Persist Configuration
const persistConfig = {
  key: "root", // Key for localStorage
  storage, // Storage mechanism
  whitelist: ["AuthReducer"] // Specify reducers to persist (only AuthReducer here)
};

// Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Compose Enhancers for Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store with persisted reducer
export const store = legacy_createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// Export persistor
export const persistor = persistStore(store);
