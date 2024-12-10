import { put } from '@redux-saga/core/effects';
import { TodoState } from '../../store/store';
import { READ_FROM_LOCAL_STORAGE } from '../../actions/actionTypes';

export function* readFromLocalStorageEffects() {
  console.log('Reading from localStorage');
  try {
    const todoState = localStorage.getItem('todoState');
    const darkMode = localStorage.getItem('darkMode') === 'true';
    
    let loadedState: TodoState = initialState;

    if (todoState) {
      const parsedState = JSON.parse(todoState) as TodoState;
      loadedState = {
        ...parsedState,
        darkMode,
      };
    }

    yield put({ 
      type: READ_FROM_LOCAL_STORAGE, 
      payload: loadedState 
    });

  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
    yield put({ 
      type: READ_FROM_LOCAL_STORAGE, 
      payload: initialState 
    });
  }
}

const initialState: TodoState = {
  todos: [],
  newTaskText: '',
  darkMode: localStorage.getItem('darkMode') === 'true',
};
