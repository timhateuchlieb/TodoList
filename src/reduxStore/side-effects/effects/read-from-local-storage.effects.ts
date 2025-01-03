import { put } from '@redux-saga/core/effects';
import { TodoState } from '../../store/store';
import { initialState } from '../../reducer/reducer';

let isInitialLoad = true;

export function* readFromLocalStorageEffects() {
  try {
    const todoState = localStorage.getItem('todoState');
    const darkMode = localStorage.getItem('darkMode') === 'true';
    
    let loadedState: TodoState = initialState;

    if (todoState && todoState !== 'undefined') {
      const parsedState = JSON.parse(todoState) as TodoState;
      loadedState = {
        ...parsedState,
        darkMode,
      };
    }

    if (isInitialLoad) {
      isInitialLoad = false;
      yield put({ 
        type: 'UPDATE_ACCORDING_TO_LOCAL_STORAGE', 
        payload: loadedState, 
      });
    }

  } catch (error) {
    yield put({ 
      type: 'UPDATE_ACCORDING_TO_LOCAL_STORAGE', 
      payload: initialState 
    });
  }
}
