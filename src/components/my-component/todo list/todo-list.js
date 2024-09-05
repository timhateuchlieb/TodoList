var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, h, State } from '@stencil/core';
let TodoList = class TodoList {
    constructor() {
        this.tasks = [];
        this.newTask = '';
        this.handleInputChange = (event) => {
            const target = event.target;
            this.newTask = target.value;
        };
        this.handleFormSubmit = (event) => {
            event.preventDefault();
            if (this.newTask.trim() !== '') {
                this.tasks = [...this.tasks, this.newTask];
                this.newTask = '';
            }
        };
    }
    render() {
        return (h("div", null,
            h("h1", null, "To-Do List"),
            h("form", { onSubmit: this.handleFormSubmit },
                h("input", { type: "text", value: this.newTask, onInput: this.handleInputChange, required: true }),
                h("button", { type: "submit" }, "Add")),
            h("ul", null, this.tasks.map(task => (h("todo-item", { task: task }))))));
    }
};
__decorate([
    State()
], TodoList.prototype, "tasks", void 0);
TodoList = __decorate([
    Component({
        tag: 'todo-list',
        styleUrl: '.todo-list.css',
        shadow: true,
    })
], TodoList);
export { TodoList };
