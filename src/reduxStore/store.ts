import { createStore } from 'redux';
import { Task } from '../components/my-component/todo list/task';

export interface TodoState {
  todos: Task[];
  newTaskText: string;
}

const initialState: TodoState = {
  todos: [],
  newTaskText: '',
};

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const UPDATE_NEW_TASK_TEXT = 'UPDATE_NEW_TASK_TEXT';

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
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.taskText === action.payload.taskText
            ? { ...todo, isChecked: !todo.isChecked }
            : todo
        ),
      };
    case UPDATE_NEW_TASK_TEXT:
      return {
        ...state,
        newTaskText: action.payload,
      };
    default:
      return state;
  }
}

export const store = createStore(todoReducer);

store.subscribe(() => {
  localStorage.setItem('todoState', JSON.stringify(store.getState()));
});
