import { createStore } from 'redux';
// Initial state
const initialState = {
    todos: [],
};
// Actions
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
// Action creators
export const addTodo = (task) => ({
    type: ADD_TODO,
    payload: task,
});
export const toggleTodo = (task) => ({
    type: TOGGLE_TODO,
    payload: task,
});
// Reducer
function todoReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return Object.assign(Object.assign({}, state), { todos: [...state.todos, action.payload] });
        case TOGGLE_TODO:
            return Object.assign(Object.assign({}, state), { todos: state.todos.map(todo => todo.taskText === action.payload.taskText
                    ? Object.assign(Object.assign({}, todo), { isChecked: !todo.isChecked }) : todo) });
        default:
            return state;
    }
}
// Create the Redux store
export const store = createStore(todoReducer);
