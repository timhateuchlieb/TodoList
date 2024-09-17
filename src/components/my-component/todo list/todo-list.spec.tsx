import { newSpecPage } from '@stencil/core/testing';
import { TodoList } from './todo-list';
import { addTodo, store, toggleTodo } from '../../../reduxStore/store';
import { Task } from './task';
import { TodoItem } from '../list-items/todo-item';

describe('todo-list', () => {

  beforeEach(() => {
    store.getState = () => ({
      todos: [],
      newTaskText: '',
    });
  });

  it('renders the component correctly', async () => {
    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    expect(page.root).toEqualHtml(`
      <todo-list>
        <div>
          <h1>To-Do List</h1>
          <p>Tasks left: 0</p>
          <form>
            <input type="text" value="" placeholder="Add a new task" required="">
            <button type="submit">Add</button>
          </form>
          <ul></ul>
        </div>
      </todo-list>
    `);
  });

  it('updates tasks when the Redux store changes', async () => {
    const task = new Task('Test Task');

    store.getState = () => ({
      todos: [task],
      newTaskText: '',
    });

    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    await page.waitForChanges();

    const todoItems = page.root.querySelectorAll('todo-item');
    expect(todoItems.length).toBe(1);
    expect(todoItems[0].getAttribute('task')).toEqual(JSON.stringify(task));
  });

  it('adds a new task when the form is submitted', async () => {
    const newTaskText = 'New Task';

    store.getState = () => ({
      todos: [],
      newTaskText,
    });

    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    const form = page.root.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    await page.waitForChanges();

    expect(store.dispatch).toHaveBeenCalledWith(addTodo(expect.any(Task)));
  });

  it('updates the newTaskText when typing in the input', async () => {
    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    const input = page.root.querySelector('input');
    input.value = 'New Task Text';
    input.dispatchEvent(new Event('input'));

    await page.waitForChanges();

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_NEW_TASK_TEXT',
      payload: 'New Task Text',
    });
  });

  it('dispatches toggleTodo when a task is completed', async () => {
    const task = new Task('Test Task');

    store.getState = () => ({
      todos: [task],
      newTaskText: '',
    });

    const page = await newSpecPage({
      components: [TodoList, TodoItem],
      html: `<todo-list></todo-list>`,
    });

    await page.waitForChanges();

    const todoItem = page.root.querySelector('todo-item');

    expect(todoItem).not.toBeNull();

    if (todoItem) {
      todoItem.dispatchEvent(new CustomEvent('todoCompleted', {
        detail: task,
      }));

      expect(store.dispatch).toHaveBeenCalledWith(toggleTodo(task));
    }
  });
});
