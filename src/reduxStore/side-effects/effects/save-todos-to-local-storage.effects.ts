import { select } from '@redux-saga/core/effects';  
import { selectState } from '../../../selectors/selectorSelector';
import { TodoState } from '../../store/store';

export function* saveTodosToLocalStorageEffects() {
  try {
    const state: TodoState = yield select(selectState);
    localStorage.setItem('todoState', JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
}
