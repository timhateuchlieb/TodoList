import { Component, h, Listen, State } from '@stencil/core';
import { store, toggleTodo } from '../../../reduxStore/store';
import { Task } from './task';
import { addTodo, updateNewTaskText } from '../../../reduxStore/store';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css',
  shadow: true,
})
export class TodoList {
  @State() tasks: Task[] = [];
  @State() newTaskText: string = '';

  componentWillLoad() {
    store.subscribe(() => {
      const state = store.getState();
      this.tasks = [...state.todos].sort((a, b) => a.isChecked - b.isChecked);
      this.newTaskText = state.newTaskText;
    });
  }

  handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    store.dispatch(updateNewTaskText(target.value));
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();
    if (this.newTaskText.trim() !== '') {
      const task = new Task(this.newTaskText);
      store.dispatch(addTodo(task));
      store.dispatch(updateNewTaskText(''));
    }
  }

  @Listen('taskUpdated') // Listen for the taskUpdated event
  handleTaskUpdated(event: CustomEvent<Task>) {
    const updatedTask = event.detail;
    store.dispatch(toggleTodo(updatedTask));
  }

  render() {
    return (
      <div>
        <h1>To-Do List</h1>
        <p>Anzahl todos: {this.tasks.filter(task => !task.isChecked).length}</p>
        <form onSubmit={(event) => this.handleFormSubmit(event)}>
          <input
            type="text"
            value={this.newTaskText}
            onInput={(event) => this.handleInputChange(event)}
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
