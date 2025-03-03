import { ADD_TODO, DELETE_TODO, UPDATE_ACCORDING_TO_LOCAL_STORAGE, TOGGLE_DARK_MODE, TOGGLE_TODO, UPDATE_NEW_TASK_TEXT, UPDATE_ACCORDING_TO_LOCAL_STORAGE_ERROR, UPDATE_ACCORDING_TO_LOCAL_STORAGE_SUCCESS, } from "./actionTypes";
export const addTodo = (task) => ({
    type: ADD_TODO,
    payload: task,
});
export const toggleTodo = (task) => ({
    type: TOGGLE_TODO,
    payload: task,
});
export const updateNewTaskText = (text) => ({
    type: UPDATE_NEW_TASK_TEXT,
    payload: text,
});
export const toggleDarkMode = (newDarkModeState) => ({
    type: TOGGLE_DARK_MODE,
    payload: newDarkModeState,
});
export const deleteTodo = (task) => ({
    type: DELETE_TODO,
    payload: task,
});
export const updateAccordingToLocalStorage = () => ({
    type: UPDATE_ACCORDING_TO_LOCAL_STORAGE,
});
export const updateAccordingToLocalStorageError = () => ({
    type: UPDATE_ACCORDING_TO_LOCAL_STORAGE_ERROR,
});
export const updateAccordingToLocalStorageSuccess = (state) => ({
    type: UPDATE_ACCORDING_TO_LOCAL_STORAGE_SUCCESS,
    payload: state,
});
//# sourceMappingURL=actions.js.map
