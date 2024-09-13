import { Component, h, State } from '@stencil/core';
import { store } from '../../../reduxStore/store';
import { addTodo, toggleTodo } from '../../../reduxStore/store';
import { Task } from './task';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css',
  shadow: true,
})
export class TodoList {
  @State() tasks: Task[] = [];

  componentWillLoad() {
    store.subscribe(() => {
      const state = store.getState();
      this.tasks = [...state.todos];
    });
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();
    const newTaskText = store.getState().newTaskText;
    if (newTaskText.trim()) {
      const task = new Task(newTaskText);
      store.dispatch(addTodo(task));
      store.dispatch({ type: 'UPDATE_NEW_TASK_TEXT', payload: '' });
    }
  }

  handleTaskUpdated(event: CustomEvent<Task>) {
    console.log("toggle toggle the todo");
    const updatedTask = event.detail;
    store.dispatch(toggleTodo(updatedTask));
    console.log("now the store knows");
  }

  handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    store.dispatch({ type: 'UPDATE_NEW_TASK_TEXT', payload: target.value });
  }

  render() {
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
