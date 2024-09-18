import { newSpecPage } from '@stencil/core/testing';
import { TodoList } from './todo-list';
import { TodoItem } from '../list-items/todo-item';
import * as ReduxStore from '../../../reduxStore/store';
import { Task } from './task';
import { addTodo, toggleTodo } from '../../../reduxStore/store';
import mock = jest.mock;

describe('todo-list', () => {

  let mockFunc;
  beforeEach(() => {
    const dummyStore = { todos: [{ taskText: 'hello '}], newTaskText: ''} as ReduxStore.TodoState;

    mockFunc =  jest.fn().mockReturnValue(dummyStore);
    jest.spyOn(ReduxStore, 'store');

    //const getStateSpy = jest.spyOn(ReduxStore.store, 'getState'),
    /*
    store.getState = jest.fn(() => ({
      todos: [],
      newTaskText: '',
    }));

    store.subscribe = jest.fn((callback) => callback());
    store.dispatch = jest.fn();

     */
  });

  it('renders the component correctly', async () => {
    // Render the component in isolation
    const page = await newSpecPage({
      components: [TodoList, TodoItem],
      html: `<todo-list></todo-list>`,
    });

    // Assert that the component renders the expected HTML structure
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

  it('displays the correct number of tasks', async () => {
    // Set up a test state with one task
    const task = new Task('Task 1');
    /*
    store.getState = jest.fn(() => ({
      todos: [{ taskName: 'Task1' } as Task],
      newTaskText: '',
    }));

     */

    const page = await newSpecPage({
      components: [TodoList, TodoItem],
      html: `<todo-list></todo-list>`,
    });

    await page.waitForChanges();
    console.log(mockFunc());
    const taskItems = page.root.querySelectorAll('todo-item');
    // Assert that one task item is rendered
    expect(taskItems.length).toBe(1);

    // Assert that the tasks left text is correct
    const tasksLeftText = page.root.querySelector('p').textContent;
    expect(tasksLeftText).toBe('Tasks left: 1');
  });

  it('adds a new task when the form is submitted', async () => {
    // Set up initial state
    store.getState = jest.fn(() => ({
      todos: [],
      newTaskText: 'New Task',
    }));

    const page = await newSpecPage({
      components: [TodoList, TodoItem],
      html: `<todo-list></todo-list>`,
    });

    const form = page.root.querySelector('form');
    expect(form).not.toBeNull(); // Assert that the form exists

    form.dispatchEvent(new Event('submit'));
    await page.waitForChanges();

    // Assert that the dispatch function is called with the right action
    expect(store.dispatch).toHaveBeenCalledWith(addTodo(expect.any(Task)));
  });

  it('updates the task list when a task is completed', async () => {
    // Set up state with one task
    const task = new Task('Test Task');
    store.getState = jest.fn(() => ({
      todos: [task],
      newTaskText: '',
    }));

    const page = await newSpecPage({
      components: [TodoList, TodoItem],
      html: `<todo-list></todo-list>`,
    });

    await page.waitForChanges();

    const todoItem = page.root.querySelector('todo-item');
    expect(todoItem).not.toBeNull(); // Assert that the task item is rendered

    // Dispatch the 'todoCompleted' event
    const event = new CustomEvent('todoCompleted', { detail: task });
    todoItem.dispatchEvent(event);
    await page.waitForChanges();

    // Assert that the dispatch function is called with toggleTodo
    expect(store.dispatch).toHaveBeenCalledWith(toggleTodo(task));
  });

  it('updates the input value when typing', async () => {
    store.getState = jest.fn(() => ({
      todos: [],
      newTaskText: '',
    }));

    const page = await newSpecPage({
      components: [TodoList, TodoItem],
      html: `<todo-list></todo-list>`,
    });

    await page.waitForChanges();

    const input = page.root.querySelector('input');
    expect(input).not.toBeNull(); // Assert that the input exists

    input.value = 'New Task Text';
    input.dispatchEvent(new Event('input'));

    await page.waitForChanges();

    // Assert that the dispatch function is called with the correct action
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_NEW_TASK_TEXT',
      payload: 'New Task Text',
    });
  });
});
