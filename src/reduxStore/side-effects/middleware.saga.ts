import { ADD_TODO, TOGGLE_TODO, TOGGLE_DARK_MODE, UPDATE_ACCORDING_TO_LOCAL_STORAGE } from '../actions/actionTypes';
import { takeLatest, call } from '@redux-saga/core/effects';
import { saveTodosToLocalStorageEffects } from './effects/save-todos-to-local-storage.effects';
import { toggleDarkModeSagaEffects } from './effects/toggle-dark-mode-saga.effects';
import { readFromLocalStorageEffects } from './effects/read-from-local-storage.effects';

export function* rootSaga() {
  yield takeLatest([ADD_TODO, TOGGLE_TODO], syncLocalStorage);
  yield takeLatest(TOGGLE_DARK_MODE, toggleDarkModeSaga);
  yield takeLatest(UPDATE_ACCORDING_TO_LOCAL_STORAGE, readFromLocalStorage);
}

function* syncLocalStorage() {
  yield call(saveTodosToLocalStorageEffects);
}

function* toggleDarkModeSaga() {
  yield call(toggleDarkModeSagaEffects);
}

function* readFromLocalStorage() {
  console.log('readFromLocalStorage');
  yield call(readFromLocalStorageEffects);
}
