import {
  ADD_TODO,
  TOGGLE_TODO,
  UPDATE_NEW_TASK_TEXT,
  TOGGLE_DARK_MODE,
  DELETE_TODO,
  UPDATE_ACCORDING_TO_LOCAL_STORAGE,
} from '../actions/actionTypes';
import { TodoState } from '../store/store';

export const initialState: TodoState = {
  todos: [],
  newTaskText: '',
  darkMode: localStorage.getItem('darkMode') === 'true',
};

function todoReducer(state = initialState, action): TodoState {
  switch (action.type) {
    case ADD_TODO:
      console.log('Whats insight localStorage? ' + localStorage.getItem('todoState'));
      return {
        ...state,
        todos: [...state.todos, action.payload],
        newTaskText: '',
      };
    case TOGGLE_TODO:
      console.log('Whats insight localStorage? ' + localStorage.getItem('todoState'));
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.taskText === action.payload.taskText
            ? { ...todo, isChecked: !todo.isChecked, completedAt: !todo.isChecked ? Date.now() : undefined }
            : todo
        ),
      };
    case UPDATE_NEW_TASK_TEXT:
      console.log('Whats insight localStorage? ' + localStorage.getItem('todoState'));
      return {
        ...state,
        newTaskText: action.payload,
      };
    case TOGGLE_DARK_MODE:
      console.log('Whats insight localStorage? ' + localStorage.getItem('todoState'));
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case DELETE_TODO:
      console.log('Whats insight localStorage? ' + localStorage.getItem('todoState'));
      return {
        ...state,
        todos: state.todos.filter(todo => todo.taskText !== action.payload.taskText),
      };
  case UPDATE_ACCORDING_TO_LOCAL_STORAGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default todoReducer;
