import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { Task } from '../todo list/task';

@Component({
  tag: 'todo-item',
  styleUrl: 'todo-item.css',
  shadow: true,
})
export class TodoItem {
  @Prop() task: Task;
  @Event() todo: EventEmitter<Task>;

  handleCheckboxChange = () => {
    this.task.isChecked = !this.task.isChecked;
    this.todo.emit(this.task);
  };

  render() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.task.isChecked}
          onChange={this.handleCheckboxChange}
        />
        <p class={this.task.isChecked ? 'completed' : ''}>{this.task.taskText}</p>
      </div>
    );
  }
}
