var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, h, Listen, State } from '@stencil/core';
import { Task } from './task';
let TodoList = class TodoList {
    constructor() {
        this.tasks = [];
        this.newTask = new Task('');
    }
    handleCheckboxChange(event) {
        const updatedTask = event.detail;
        this.tasks = this.tasks.map(task => task.taskText === updatedTask.taskText ? updatedTask : task);
    }
    handleInputChange(event) {
        const target = event.target;
        this.newTask.taskText = target.value;
    }
    handleFormSubmit(event) {
        event.preventDefault();
        if (this.newTask.taskText.trim() !== '') {
            const task = new Task(this.newTask.taskText);
            this.tasks = [...this.tasks, task];
            this.newTask = new Task('');
        }
    }
    render() {
        return (h("div", null,
            h("h1", null, "To-Do List"),
            h("p", null,
                "Number of tasks: ",
                this.tasks.filter(task => !task.isChecked).length),
            h("form", { onSubmit: (event) => this.handleFormSubmit(event) },
                h("input", { type: "text", value: this.newTask.taskText, onInput: (event) => this.handleInputChange(event), placeholder: "Add a new task", required: true }),
                h("button", { type: "submit" }, "Add")),
            h("ul", null, this.tasks.map(task => (h("todo-item", { task: task }))))));
    }
};
__decorate([
    State()
], TodoList.prototype, "tasks", void 0);
__decorate([
    State()
], TodoList.prototype, "newTask", void 0);
__decorate([
    Listen('todo')
], TodoList.prototype, "handleCheckboxChange", null);
TodoList = __decorate([
    Component({
        tag: 'todo-list',
        styleUrl: 'todo-list.css',
        shadow: true,
    })
], TodoList);
export { TodoList };
