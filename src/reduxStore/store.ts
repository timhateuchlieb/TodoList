import { createStore } from 'redux';
import { Task } from '../components/my-component/todo list/task';

// Define the structure of your state
interface TodoState {
  todos: Task[];
}

// Initial state
const initialState: TodoState = {
  todos: [],
};

// Actions
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// Action creators
export const addTodo = (task: Task) => ({
  type: ADD_TODO,
  payload: task,
});

export const toggleTodo = (task: Task) => ({
  type: TOGGLE_TODO,
  payload: task,
});

// Reducer
function todoReducer(state = initialState, action): TodoState {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
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
    default:
      return state;
  }
}

// Create the Redux store
export const store = createStore(todoReducer);
