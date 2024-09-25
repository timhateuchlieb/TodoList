import { createStore } from 'redux';
import { Task } from '../components/my-component/todo list/task';

// Define the structure of your state
export interface TodoState {
  todos: Task[];
  newTaskText: string;
}

// Initial state
const initialState: TodoState = {
  todos: [],
  newTaskText: '',
};

// Actions
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const UPDATE_NEW_TASK_TEXT = 'UPDATE_NEW_TASK_TEXT';

// Action creators
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

// Reducer
function todoReducer(state = initialState, action): TodoState {
  switch (action.type) {
    case ADD_TODO:
      console.log('ADD_TODO');
      return {
        ...state,
        todos: [...state.todos, action.payload],
        newTaskText: '',
      }
    case TOGGLE_TODO:
      console.log('toggle todo');
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

// Create the Redux store
export const store = createStore(todoReducer);

