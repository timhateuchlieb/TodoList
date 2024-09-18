import { createStore } from 'redux';
// Initial state
const initialState = {
    todos: [],
    newTaskText: '',
};
// Actions
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const UPDATE_NEW_TASK_TEXT = 'UPDATE_NEW_TASK_TEXT';
// Action creators
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
// Reducer
function todoReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return Object.assign(Object.assign({}, state), { todos: [...state.todos, action.payload], newTaskText: '' });
        case TOGGLE_TODO:
            return Object.assign(Object.assign({}, state), { todos: state.todos.map(todo => todo.taskText === action.payload.taskText
                    ? Object.assign(Object.assign({}, todo), { isChecked: !todo.isChecked }) : todo) });
        case UPDATE_NEW_TASK_TEXT:
            return Object.assign(Object.assign({}, state), { newTaskText: action.payload });
        default:
            return state;
    }
}
// Create the Redux store
export const store = createStore(todoReducer);
