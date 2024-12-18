import { selectAllTodos } from '../../../selectors/selectorSelector';

export function* saveTodosToLocalStorageEffects() {
  console.log('saveTodosToLocalStorageEffects');
  localStorage.setItem('todoState', JSON.stringify(yield selectAllTodos));
  console.log('Saved to localStorage' + localStorage.getItem('todoState'));
}
