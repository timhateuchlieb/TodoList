import {
  ADD_TODO,
  TOGGLE_TODO,
  UPDATE_NEW_TASK_TEXT,
  TOGGLE_DARK_MODE,
  DELETE_TODO,
  READ_FROM_LOCAL_STORAGE,
} from '../actions/actionTypes';
import { TodoState } from '../store/store';

const initialState: TodoState = {
  todos: [],
  newTaskText: '',
  darkMode: localStorage.getItem('darkMode') === 'true',
};

function todoReducer(state = initialState, action): TodoState {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        newTaskText: '',
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.taskText === action.payload.taskText
            ? { ...todo, isChecked: !todo.isChecked, completedAt: !todo.isChecked ? Date.now() : undefined }
            : todo
        ),
      };
    case UPDATE_NEW_TASK_TEXT:
      return {
        ...state,
        newTaskText: action.payload,
      };
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.taskText !== action.payload.taskText),
      };
    case READ_FROM_LOCAL_STORAGE:
      const persistedState = localStorage.getItem('todoState');
      const persistedDarkMode = localStorage.getItem('darkMode');
      
      let todos = [];
      try {
        if (persistedState) {
          const parsed = JSON.parse(persistedState);
          todos = parsed.todos || [];
        }
      } catch (error) {
        console.error('Failed to parse persisted state:', error);
      }

      return {
        ...state,
        todos,
        newTaskText: '',
        darkMode: persistedDarkMode === 'true'
      };
    default:
      return state;
  }
}

export default todoReducer;
