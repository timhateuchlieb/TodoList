import { put } from '@redux-saga/core/effects';
import { TodoState } from '../../store/store';
import { initialState } from '../../reducer/reducer';
import { READ_FROM_LOCAL_STORAGE_SUCCESS } from '../../actions/actionTypes';

export function* readFromLocalStorageEffects() {
  console.log('hihi huhu');
  try {
    console.log('readFromLocalStorageEffects');
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

    yield put({ 
      type: READ_FROM_LOCAL_STORAGE_SUCCESS, 
      payload: loadedState 
    });

  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
    yield put({ 
      type: READ_FROM_LOCAL_STORAGE_SUCCESS, 
      payload: initialState 
    });
  }
}
