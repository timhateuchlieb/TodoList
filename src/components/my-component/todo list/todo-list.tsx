import { Component, h, Listen, State } from '@stencil/core';
import { Task } from './task';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css',
  shadow: true,
})
export class TodoList {
  @State() tasks: Task[] = [];

  private input: HTMLInputElement;

  @Listen('todo')
  handleCheckboxChange(event: CustomEvent<Task>) {
    const updatedTask = event.detail;
    this.tasks = this.tasks.map(task =>
      task.taskText === updatedTask.taskText
        ? { ...task, isChecked: updatedTask.isChecked }
        : task)
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();
    const text = this.input.value.trim();

    if (text !== '') {
      const task = new Task(text);
      this.tasks = [...this.tasks, task];
      console.log(this.tasks);

      this.input.value = '';
    }
  }

  render() {
    return (
      <div>
        <h1>To-Do List</h1>
        <p>Number of tasks: {this.tasks.filter(task => !task.isChecked).length}</p>
        <form onSubmit={(event) => this.handleFormSubmit(event)}>
          <input ref={(el) => this.input = el}
            type="text"
            placeholder="Add a new task"
            required
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {this.tasks.map(task => (
            <todo-item task={task}></todo-item>
          ))}
        </ul>
      </div>
    );
  }
}
