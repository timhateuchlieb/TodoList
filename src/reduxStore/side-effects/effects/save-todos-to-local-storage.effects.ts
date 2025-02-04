import { select } from '@redux-saga/core/effects';
import { selectState } from '../../../selectors/selectorSelector';
import { TodoState } from '../../store/store';

export function* saveTodosToLocalStorageEffects() {;
  const state: TodoState = yield select(selectState);
  localStorage.setItem('todoState', JSON.stringify(state.todos));
}
