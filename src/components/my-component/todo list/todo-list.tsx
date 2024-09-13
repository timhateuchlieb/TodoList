import { Component, h } from '@stencil/core';
import { store } from '../../../reduxStore/store';
import { addTodo, updateNewTaskText, toggleTodo } from '../../../reduxStore/store';
import { Task } from './task';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css',
  shadow: true,
})
export class TodoList {

  handleInputChange(event: Event) {
    console.log("InputChange", event);
    const target = event.target as HTMLInputElement;
    store.dispatch(updateNewTaskText(target.value));
  }

  handleFormSubmit(event: Event) {
    console.log("FormSubmit", event);
    event.preventDefault();
    if (store.getState().newTaskText  !== '') {
      const task = new Task(store.getState().newTaskText);
      store.dispatch(addTodo(task));
      store.dispatch(store.dispatch(updateNewTaskText('')));
    }
  }

  handleTaskUpdated(event: CustomEvent<Task>) {
    const updatedTask = event.detail;
    store.dispatch(toggleTodo(updatedTask));
  }

  render() {
    return (
      <div>
        <h1>To-Do List</h1>
        <p>Tasks left: {store.getState().todos.filter(task => !task.isChecked).length}</p>
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
          {store.getState().todos.map(todo => (
            <todo-item task={todo}></todo-item>
          ))}
        </ul>
      </div>
    );
  }
}
