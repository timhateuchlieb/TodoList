import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import todoReducer from '../reducer/reducer';
import { rootSaga } from '../side-effects/middleware.saga';
import { Task } from '../../components/my-component/todo list/task';

export interface TodoState {
  todos: Task[];
  newTaskText: string;
  darkMode: boolean;
}

function loadPersistedState(): TodoState {
  try {
    const todoState = localStorage.getItem('todoState');
    const darkMode = localStorage.getItem('darkMode') === 'true';

    if (todoState) {
      const parsedState = JSON.parse(todoState) as TodoState;
      return {
        ...parsedState,
        darkMode,
      };
    }
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
  }
  return initialState;
}

const initialState: TodoState = {
  todos: [],
  newTaskText: '',
  darkMode: localStorage.getItem('darkMode') === 'true',
};

const persistedState = loadPersistedState();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(todoReducer, persistedState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  try {
    const state = store.getState() as TodoState;
    localStorage.setItem('todoState', JSON.stringify(state));
    localStorage.setItem('darkMode', String(state.darkMode));
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
});

export default store;
