import { put } from '@redux-saga/core/effects';
import { updateAccordingToLocalStorageError } from '../../actions/actions';
import { updateAccordingToLocalStorageSuccess } from '../../actions/actions';

export function* readFromLocalStorageEffects() {
  try {
    const todoState = localStorage.getItem('todoState');

    yield put(updateAccordingToLocalStorageSuccess( JSON.parse(todoState)));

  } catch (error) {
    yield put(updateAccordingToLocalStorageError());
  }
}
