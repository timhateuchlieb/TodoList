import store from "../reduxStore/store/store";
const state = () => store.getState();
export function selectState() {
    return state();
}
export function selectDarkModeState() {
    return state().darkMode;
}
export function selectAllTodos() {
    return state().todos;
}
export function selectNewTaskText() {
    return state().newTaskText;
}
//# sourceMappingURL=selectorSelector.js.map
