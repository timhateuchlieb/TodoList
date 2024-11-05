import { Component, Element, h, State } from '@stencil/core';
import { addTodo, store, toggleTodo, toggleDarkMode } from '../../../reduxStore/store';
import { Task } from './task';
import { Unsubscribe } from 'redux';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css',
  shadow: true,
})
export class TodoList {
  @State() tasks: Task[] = [];
  @State() darkMode: boolean = false;

  @Element() hostElement: HTMLElement;

  private unsubscribe: Unsubscribe = null;

  componentWillLoad() {
    this.syncWithStore()
    this.applyDarkMode(store.getState().darkMode);
    this.unsubscribe = store.subscribe(() => {
    this.syncWithStore()
    this.applyDarkMode(store.getState().darkMode);
    });
  }

  syncWithStore() {
      const state = store.getState();
      this.tasks = [...state.todos];
  }

  toggleDarkMode() {
    store.dispatch(toggleDarkMode());
  }

  applyDarkMode(isDarkMode: boolean) {
    document.documentElement.classList.toggle('darkMode', isDarkMode);
  }

  disconnectedCallback() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();
    const newTaskText = store.getState().newTaskText;
    if (newTaskText.trim()) {
      const task = new Task(newTaskText);
      store.dispatch(addTodo(task));
    }
  }

  handleTaskUpdated(event: CustomEvent<Task>) {
    const updatedTask = event.detail;
    store.dispatch(toggleTodo(updatedTask));
  }

  handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    store.dispatch({ type: 'UPDATE_NEW_TASK_TEXT', payload: target.value });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.toggleDarkMode()}>
          {this.darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <h1>To-Do List</h1>
        <p>Tasks left: {this.tasks.filter(task => !task.isChecked).length}</p>
        <form onSubmit={(event) => this.handleFormSubmit(event)}>
          <input
            type="text"
            value={store.getState().newTaskText}
            onInput={(event) => this.handleInputChange(event)}
            placeholder="Add a new task"
            required
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {this.tasks.map(task => (
            <todo-item task={task} onTodoCompleted={(event) => this.handleTaskUpdated(event)}></todo-item>
          ))}
        </ul>
      </div>
    );
  }
}
