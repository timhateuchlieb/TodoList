import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import todoReducer from '../reducer/reducer';
import { rootSaga } from '../side-effects/middleware.saga';
import { Task } from '../../components/my-component/todo list/task';
import { selectState } from '../../selectors/selectorSelector';

export interface TodoState {
  todos: Task[];
  newTaskText: string;
  darkMode: boolean;
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(todoReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  try {
    const state = selectState() as TodoState;
    localStorage.setItem('todoState', JSON.stringify(state));
    localStorage.setItem('darkMode', String(state.darkMode));
  }
  catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
});

export default store;
