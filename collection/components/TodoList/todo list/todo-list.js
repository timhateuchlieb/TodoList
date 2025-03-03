import { h } from "@stencil/core";
import { Task } from "./task";
import store from "../../../reduxStore/store/store";
import { addTodo, toggleTodo, toggleDarkMode, updateAccordingToLocalStorage } from "../../../reduxStore/actions/actions";
import { selectAllTodos, selectDarkModeState, selectNewTaskText } from "../../../selectors/selectorSelector";
export class TodoList {
    constructor() {
        this.unsubscribe = null;
        this.tasks = [];
        this.darkMode = false;
        this.newTaskText = '';
    }
    componentWillLoad() {
        store.dispatch(updateAccordingToLocalStorage());
        this.syncWithStore();
        this.unsubscribe = store.subscribe(() => {
            this.syncWithStore();
        });
    }
    syncWithStore() {
        const newTasks = selectAllTodos();
        const newDarkMode = selectDarkModeState();
        const newTaskText = selectNewTaskText();
        if (this.tasks !== newTasks) {
            this.tasks = newTasks;
        }
        if (this.darkMode !== newDarkMode) {
            this.darkMode = newDarkMode;
        }
        if (this.newTaskText !== newTaskText) {
            this.newTaskText = newTaskText;
        }
    }
    toggleDarkMode() {
        let newDarkModeState = !this.darkMode;
        store.dispatch(toggleDarkMode(newDarkModeState));
    }
    disconnectedCallback() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
    handleFormSubmit(event) {
        event.preventDefault();
        if (this.newTaskText.trim()) {
            const task = new Task(this.newTaskText);
            store.dispatch(addTodo(task));
        }
    }
    handleTaskUpdated(event) {
        const updatedTask = event.detail;
        store.dispatch(toggleTodo(updatedTask));
    }
    handleInputChange(event) {
        const target = event.target;
        store.dispatch({ type: 'UPDATE_NEW_TASK_TEXT', payload: target.value });
    }
    render() {
        return (h("div", { key: '327b2760d7ab605c5a763a692fe8dbaf705101ba', class: this.darkMode ? 'dark' : 'light' }, h("button", { key: 'c823fbbf8c4b89f448dca7dc33ee68e3e72eba02', onClick: () => this.toggleDarkMode() }, this.darkMode ? 'Light Mode' : 'Dark Mode'), h("h1", { key: '65429fd0d6cf1b63dccbc4873e6eda24c8357cc4' }, "To-Do List"), h("p", { key: '8799348377c63f61c7966b82f27d4209ca71a5a6' }, "Tasks left: ", this.tasks.filter(task => !task.isChecked).length), h("form", { key: 'f04a5b5b7f12c95a8a67b2ace7f185ac2d091c48', onSubmit: (event) => this.handleFormSubmit(event) }, h("input", { key: '443c9ad5aa8f464ecf876ea65f362d237adcead6', type: "text", value: this.newTaskText, onInput: (event) => this.handleInputChange(event), placeholder: "Add a new task", required: true }), h("button", { key: 'eda02e610c6b750db716506680f2685d00bcd6ba', type: "submit" }, "Add")), h("ul", { key: '1d90e2aeaa2f0f924f25a4f64325f678ef4d68f8' }, this.tasks.map(task => (h("todo-item", { task: task, onTodoCompleted: (event) => this.handleTaskUpdated(event) }))))));
    }
    static get is() { return "todo-list"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["todo-list.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["todo-list.css"]
        };
    }
    static get states() {
        return {
            "tasks": {},
            "darkMode": {},
            "newTaskText": {}
        };
    }
    static get elementRef() { return "hostElement"; }
}
//# sourceMappingURL=todo-list.js.map
