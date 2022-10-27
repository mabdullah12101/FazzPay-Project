import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(promiseMiddleware, logger);
let store = createStore(persistedReducer, middleware);
let persistor = persistStore(store);

export { store, persistor };
