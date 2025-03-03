import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import todoReducer from "../reducer/reducer";
import { rootSaga } from "../side-effects/middleware.saga";
const sagaMiddleware = createSagaMiddleware();
const store = createStore(todoReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export default store;
//# sourceMappingURL=store.js.map
