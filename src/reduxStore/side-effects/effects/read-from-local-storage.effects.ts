import { put } from '@redux-saga/core/effects';
import { TodoState } from '../../store/store';
import { initialState } from '../../reducer/reducer';

export function* readFromLocalStorageEffects() {
  console.log('readFromLocalStorageEffects started');
  try {
    console.log('Current localStorage:', localStorage.getItem('todoState'), localStorage.getItem('darkMode'));
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

    console.log('loadedState', loadedState);

    yield put({ 
      type: 'TOGGLE_DARK_MODE', 
      payload: loadedState.darkMode 
    });

    yield put({ 
      type: 'UPDATE_ACCORDING_TO_LOCAL_STORAGE', 
      payload: loadedState 
    });

  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
    yield put({ 
      type: 'UPDATE_ACCORDING_TO_LOCAL_STORAGE', 
      payload: initialState 
    });
  }
}
