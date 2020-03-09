import { Dispatch, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { reducer, State, Action } from "./state";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { rootSaga } from "./saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(
  {
    key: "root",
    storage
  },
  reducer
);
export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);
// @ts-ignore - probably incompatible typescript actions
export const persistor = persistStore(store);

export const useTypedSelector: TypedUseSelectorHook<State> = useSelector;
export const useTypedDispatch = useDispatch as () => Dispatch<Action>;

async function start() {
  sagaMiddleware.run(rootSaga);
}
start();
