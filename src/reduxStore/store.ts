import { createStore } from 'redux';
import { Task } from '../components/my-component/todo list/task';

export interface TodoState {
  todos: Task[];
  newTaskText: string;
  darkMode: boolean;
}

const initialState: TodoState = {
  todos: [],
  newTaskText: '',
  darkMode: localStorage.getItem('darkMode') === 'true',
};

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const UPDATE_NEW_TASK_TEXT = 'UPDATE_NEW_TASK_TEXT';
const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

export const addTodo = (task: Task) => ({
  type: ADD_TODO,
  payload: task,
});

export const toggleTodo = (task: Task) => ({
  type: TOGGLE_TODO,
  payload: task,
});

export const updateNewTaskText = (text: string) => ({
  type: UPDATE_NEW_TASK_TEXT,
  payload: text,
});

export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE,
});

const persistedState = localStorage.getItem('todoState')
  ? JSON.parse(localStorage.getItem('todoState')!)
  : initialState;

function todoReducer(state = persistedState, action): TodoState {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        newTaskText: '',
      };
    case
    TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.taskText === action.payload.taskText
            ? {
              ...todo,
              isChecked: !todo.isChecked,
              completedAt: !todo.isChecked ? Date.now() : undefined,
            }
            : todo,
        ),
      };
    case UPDATE_NEW_TASK_TEXT:
      return {
        ...state,
        newTaskText: action.payload,
      };
    case TOGGLE_DARK_MODE:
      console.log('TOGGLE_DARK_MODE');
      const newDarkModeState =! state.darkMode;
      localStorage.setItem('darkMode', String(newDarkModeState));
      return {
        ...state,
        darkMode: newDarkModeState,
      };
    default:
      return state;
  }
}

export const store = createStore(todoReducer);

store.subscribe(() => {
  localStorage.setItem('todoState', JSON.stringify(store.getState()));
});
