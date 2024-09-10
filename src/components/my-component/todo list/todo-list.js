var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, h, Listen, State } from '@stencil/core';
import { store, addTodo } from '../../../reduxStore/store';
import { toggleTask } from '../../../../dist/types/reduxStore/store';
let TodoList = class TodoList {
    constructor() {
        this.tasks = [];
        this.newTaskText = '';
    }
    // Subscribe to Redux store
    componentWillLoad() {
        store.subscribe(() => {
            this.tasks = store.getState().todos;
        });
    }
    handleInputChange(event) {
        const target = event.target;
        this.newTaskText = target.value;
    }
    handleFormSubmit(event) {
        event.preventDefault();
        if (this.newTaskText.trim() !== '') {
            const newTask = { taskText: this.newTaskText, isChecked: false };
            store.dispatch(addTodo(newTask));
            this.newTaskText = '';
        }
    }
    handleCheckboxChange(event) {
        store.dispatch(toggleTask(event.detail));
    }
    render() {
        return (h("div", null,
            h("h1", null, "To-Do List"),
            h("p", null,
                "Anzahl todos: ",
                this.tasks.filter(task => !task.isChecked).length),
            h("form", { onSubmit: (event) => this.handleFormSubmit(event) },
                h("input", { type: "text", value: this.newTaskText, onInput: (event) => this.handleInputChange(event), placeholder: "Add a new task", required: true }),
                h("button", { type: "submit" }, "Add")),
            h("ul", null, this.tasks.map(task => (h("todo-item", { task: task }))))));
    }
};
__decorate([
    State()
], TodoList.prototype, "tasks", void 0);
__decorate([
    State()
], TodoList.prototype, "newTaskText", void 0);
__decorate([
    Listen('todoCompleted')
], TodoList.prototype, "handleCheckboxChange", null);
TodoList = __decorate([
    Component({
        tag: 'todo-list',
        styleUrl: 'todo-list.css',
        shadow: true,
    })
], TodoList);
export { TodoList };
