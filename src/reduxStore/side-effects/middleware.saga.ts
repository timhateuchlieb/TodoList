import { ADD_TODO, TOGGLE_TODO, TOGGLE_DARK_MODE } from '../actions/actionTypes';
import { takeLatest } from '@redux-saga/core/effects';
import { saveTodosToLocalStorageEffects } from './effects/save-todos-to-local-storage.effects';
import {toggleDarkModeSagaEffects} from './effects/toggle-dark-mode-saga.effects';

export function* rootSaga() {
  yield takeLatest([ADD_TODO, TOGGLE_TODO], syncLocalStorage);
  yield takeLatest(TOGGLE_DARK_MODE, toggleDarkModeSaga);
}

function* syncLocalStorage() {
  yield takeLatest(ADD_TODO, saveTodosToLocalStorageEffects);
  yield takeLatest(TOGGLE_TODO, saveTodosToLocalStorageEffects)
}

function* toggleDarkModeSaga() {
  yield takeLatest(TOGGLE_DARK_MODE, toggleDarkModeSagaEffects);
}
