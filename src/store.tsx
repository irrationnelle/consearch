import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { concert } from "./reducers";
import { mySaga } from "./sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(concert, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(mySaga);

// render the application

export default store;
