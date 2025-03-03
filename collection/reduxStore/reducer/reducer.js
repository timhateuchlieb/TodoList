import { ADD_TODO, TOGGLE_TODO, UPDATE_NEW_TASK_TEXT, TOGGLE_DARK_MODE, DELETE_TODO, UPDATE_ACCORDING_TO_LOCAL_STORAGE_ERROR, UPDATE_ACCORDING_TO_LOCAL_STORAGE_SUCCESS, } from "../actions/actionTypes";
export const initialState = {
    todos: [],
    newTaskText: '',
    darkMode: localStorage.getItem('darkMode') === 'true',
};
function todoReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return Object.assign(Object.assign({}, state), { todos: [...state.todos, action.payload], newTaskText: '' });
        case TOGGLE_TODO:
            return Object.assign(Object.assign({}, state), { todos: state.todos.map(todo => todo.taskText === action.payload.taskText
                    ? Object.assign(Object.assign({}, todo), { isChecked: !todo.isChecked, completedAt: !todo.isChecked ? Date.now() : undefined }) : todo) });
        case UPDATE_NEW_TASK_TEXT:
            return Object.assign(Object.assign({}, state), { newTaskText: action.payload });
        case TOGGLE_DARK_MODE:
            return Object.assign(Object.assign({}, state), { darkMode: !state.darkMode });
        case DELETE_TODO:
            return Object.assign(Object.assign({}, state), { todos: state.todos.filter(todo => todo.taskText !== action.payload.taskText) });
        case UPDATE_ACCORDING_TO_LOCAL_STORAGE_SUCCESS:
            document.documentElement.classList.toggle('darkMode', action.payload.darkMode);
            return Object.assign(Object.assign({}, state), { todos: action.payload.todos });
        case UPDATE_ACCORDING_TO_LOCAL_STORAGE_ERROR:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}
export default todoReducer;
//# sourceMappingURL=reducer.js.map
