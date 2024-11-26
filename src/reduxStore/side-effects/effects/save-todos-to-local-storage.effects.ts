import store, { TodoState } from '../../store/store';

export function* saveTodosToLocalStorageEffects() {
  console.log('saveTodosToLocalStorageEffects');
  const state: TodoState = yield store.getState;
  localStorage.setItem('todoState', JSON.stringify(state.todos));
}
