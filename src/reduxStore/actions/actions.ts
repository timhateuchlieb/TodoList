import { Task } from '../../components/my-component/todo list/task';
import {
  ADD_TODO,
  DELETE_TODO,
  READ_FROM_LOCAL_STORAGE,
  TOGGLE_DARK_MODE,
  TOGGLE_TODO,
  UPDATE_NEW_TASK_TEXT,
} from './actionTypes';

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

export const deleteTodo = (task: Task) => ({    //todo     never used, not implemented a delete jet!
  type: DELETE_TODO,
  payload: task,
});

export const readFromLocalStorage = () => ({
  type: READ_FROM_LOCAL_STORAGE,
});
