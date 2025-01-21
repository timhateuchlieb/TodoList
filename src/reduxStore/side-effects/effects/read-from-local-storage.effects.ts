import { put } from '@redux-saga/core/effects';
import { updateAccordingToLocalStorageError } from '../../actions/actions';
import { updateAccordingToLocalStorageSuccess } from '../../actions/actions';

export function* readFromLocalStorageEffects() {
  try {
    const todoState = localStorage.getItem('todoState');
    const darkMode = localStorage.getItem('darkMode') === 'true';
    const isDarkModeClass = document.documentElement.classList.contains('darkMode');

    if (darkMode !== isDarkModeClass) {
      document.documentElement.classList.toggle('darkMode', darkMode);
    }

    yield put(updateAccordingToLocalStorageSuccess( {todos: JSON.parse(todoState), darkMode: darkMode}));
  } catch (error) {
    yield put(updateAccordingToLocalStorageError());
  }
}
