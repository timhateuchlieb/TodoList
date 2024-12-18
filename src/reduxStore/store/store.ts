import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import todoReducer from '../reducer/reducer';
import { rootSaga } from '../side-effects/middleware.saga';
import { Task } from '../../components/TodoList/todo list/task';

export interface TodoState {
  todos: Task[];
  newTaskText: string;
  darkMode: boolean;
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(todoReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
