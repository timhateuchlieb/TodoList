import { put } from '@redux-saga/core/effects';
import { updateAccordingToLocalStorageError } from '../../actions/actions';
import { updateAccordingToLocalStorageSuccess } from '../../actions/actions';

export function* readFromLocalStorageEffects() {
  console.log('readFromLocalStorageEffects');
  try {
    const todoState = localStorage.getItem('todoState');
    const darkMode = localStorage.getItem('darkMode');
    yield put(updateAccordingToLocalStorageSuccess( {todos: JSON.parse(todoState), darkMode: darkMode === 'true'}));
  } catch (error) {
    yield put(updateAccordingToLocalStorageError());
  }
}
