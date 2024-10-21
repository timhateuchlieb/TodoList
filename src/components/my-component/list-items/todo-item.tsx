import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { Task } from '../todo list/task';

@Component({
  tag: 'todo-item',
  styleUrl: 'todo-item.css',
  shadow: true,
})
export class TodoItem {
  @Prop() task: Task;

  @Event() todoCompleted: EventEmitter<Task>;

  componentWillLoad() {
    console.log('Item Loaded')
  }

  handleCheckboxChange() {
    this.todoCompleted.emit(this.task);
  }

  render() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.task.isChecked}
          onChange={() => this.handleCheckboxChange()}
        />
        <p class={this.task.isChecked ? 'completed' : ''}>{this.task.taskText}</p>
      </div>
    );
  }
}
