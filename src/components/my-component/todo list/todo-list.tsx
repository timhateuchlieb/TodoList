import { Component, ComponentInterface, h, State } from '@stencil/core';
import { addTodo, store, toggleTodo } from '../../../reduxStore/store';
import { Task } from './task';
import { Unsubscribe } from 'redux';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css',
  shadow: true,
})
export class TodoList {
  @State() tasks: Task[] = [];

  private instance = Math.random();

  private unsubscribe: Unsubscribe = null;

  componentWillLoad() {
    console.log('COMPONENT WILL LOAD')
    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();
      this.tasks = [...state.todos];
    });
    console.log(store);
  }

  disconnectedCallback() {
    console.log('DISCONNECTED CALLBACK');
    if (this.unsubscribe) {
      console.log('unsubscribe', this.instance);
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
    console.log('TodoList handleTaskUpdated');
    const updatedTask = event.detail;
    store.dispatch(toggleTodo(updatedTask));
  }

  handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    store.dispatch({ type: 'UPDATE_NEW_TASK_TEXT', payload: target.value });
  }

  render() {
    console.log('rendering tasks ', this.tasks, 'on instance', this.instance);
    return (
      <div>
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
