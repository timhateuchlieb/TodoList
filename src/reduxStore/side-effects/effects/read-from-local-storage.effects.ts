import { TodoState } from '../../store/store';

export function* readFromLocalStorageEffects(): Generator<TodoState> {
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
