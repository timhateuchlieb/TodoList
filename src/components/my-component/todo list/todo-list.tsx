import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'todo-list',
  styleUrl: 'list.css',
  shadow: true,
})
export class TodoList {
  @State() tasks: string[] = [];
  @State() newTask: string = '';

  handleInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.newTask = target.value;
  };

  handleFormSubmit = (event: Event) => {
    event.preventDefault();
    if (this.newTask.trim() !== '') {
      this.tasks = [...this.tasks, this.newTask];
      this.newTask = '';
    }
  };

  render() {
    return (
      <div>
        <h1>To-Do List</h1>
        <p>Anzahl todos: {this.tasks.length}</p>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            value={this.newTask}
            onInput={this.handleInputChange}
            placeholder="Add a new task"
            required
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {this.tasks.map(task => (
            <list-item task={task}></list-item>
          ))}
        </ul>
      </div>
    );
  }
}
