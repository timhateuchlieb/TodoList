import {
  ADD_TODO,
  TOGGLE_TODO,
  UPDATE_NEW_TASK_TEXT,
  TOGGLE_DARK_MODE,
  DELETE_TODO,
  UPDATE_ACCORDING_TO_LOCAL_STORAGE_ERROR,
  UPDATE_ACCORDING_TO_LOCAL_STORAGE_SUCCESS,
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
    case UPDATE_ACCORDING_TO_LOCAL_STORAGE_SUCCESS:
      return{
        ...state,
        todos: action.payload.todos,
        darkMode: action.payload.darkMode,
      }
    case UPDATE_ACCORDING_TO_LOCAL_STORAGE_ERROR:
      return {
        ...initialState,
      };  
    default:
      return state;
  }
}

export default todoReducer;
