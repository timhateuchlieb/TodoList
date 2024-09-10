import { Component, h, Listen, State } from '@stencil/core';
import { store, addTodo} from '../../../reduxStore/store';
import { toggleTodo } from '../../../reduxStore/store';
import { Task } from './task';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css',
  shadow: true,
})
export class TodoList {
  @State() tasks: Task[] = [];
  @State() newTaskText: string = '';

  // Subscribe to Redux store
  componentWillLoad() {
    store.subscribe(() => {
      this.tasks = store.getState().todos;
    });
  }

  handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.newTaskText = target.value;
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();
    if (this.newTaskText.trim() !== '') {
      const newTask: Task = { taskText: this.newTaskText, isChecked: false };
      store.dispatch(addTodo(newTask));
      this.newTaskText = '';
    }
  }

  @Listen('todoCompleted')
  handleCheckboxChange(event: CustomEvent<Task>) {
    store.dispatch(toggleTodo(event.detail));
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
