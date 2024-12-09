import { Component, Element, h, State } from '@stencil/core';
import { Task } from './task';
import { Unsubscribe } from 'redux';
import store from '../../../reduxStore/store/store';
import { addTodo, toggleTodo, toggleDarkMode, readFromLocalStorage } from '../../../reduxStore/actions/actions';
import { selectAllTodos, selectDarkModeState, selectNewTaskText, } from '../../../selectors/selectorSelector';

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
    console.log('Component will load');
    store.dispatch(readFromLocalStorage);
    this.syncWithStore();
    this.unsubscribe = store.subscribe(() => {
      console.log('Store updated, syncing...');
      this.syncWithStore();
    });
  }

  syncWithStore() {
    console.log('Syncing with store');
    this.tasks = selectAllTodos();
    this.darkMode = selectDarkModeState();
    console.log('Current tasks:', this.tasks);
    console.log('Dark mode:', this.darkMode);
  }

  toggleDarkMode() {
    store.dispatch(toggleDarkMode());
  }

  disconnectedCallback() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();
    console.log('Form submitted, current text:', selectNewTaskText());
    if (selectNewTaskText().trim()) {
      const task = new Task(selectNewTaskText());
      console.log('Creating new task:', task);
      store.dispatch(addTodo(task));
    }
  }

  handleTaskUpdated(event: CustomEvent<Task>) {
    const updatedTask = event.detail;
    store.dispatch(toggleTodo(updatedTask));
  }

  handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Input changed to:', target.value);
    store.dispatch({ type: 'UPDATE_NEW_TASK_TEXT', payload: target.value });
  }

  render() {
    return (
      <div class={this.darkMode ? 'dark' : 'light'}>
        <button onClick={() => this.toggleDarkMode()}>
          {this.darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <h1>To-Do List</h1>
        <p>Tasks left: {this.tasks.filter(task => !task.isChecked).length}</p>
        <form onSubmit={(event) => this.handleFormSubmit(event)}>
          <input
            type="text"
            value={selectNewTaskText()}
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
