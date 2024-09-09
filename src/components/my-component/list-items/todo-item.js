var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, h, Prop, Event } from '@stencil/core';
let TodoItem = class TodoItem {
    constructor() {
        this.handleCheckboxChange = () => {
            this.task.isChecked = !this.task.isChecked;
            this.todo.emit(this.task);
        };
    }
    render() {
        return (h("div", null,
            h("input", { type: "checkbox", checked: this.task.isChecked, onChange: this.handleCheckboxChange }),
            h("p", { class: this.task.isChecked ? 'completed' : '' }, this.task.taskText)));
    }
};
__decorate([
    Prop()
], TodoItem.prototype, "task", void 0);
__decorate([
    Event()
], TodoItem.prototype, "todo", void 0);
TodoItem = __decorate([
    Component({
        tag: 'todo-item',
        styleUrl: 'todo-item.css',
        shadow: true,
    })
], TodoItem);
export { TodoItem };
