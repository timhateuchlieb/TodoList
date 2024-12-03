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
    store.dispatch(readFromLocalStorage);
    this.syncWithStore();
    this.unsubscribe = store.subscribe(() => {
      this.syncWithStore();
    });
  }

  syncWithStore() {
    this.tasks = selectAllTodos();
    this.darkMode = selectDarkModeState();
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
    if (selectNewTaskText().trim()) {
      const task = new Task(selectNewTaskText());
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
