import { h } from '@stencil/core';
import { addTodo } from '../../../reduxStore/store';
import { Task } from './task';


import { newSpecPage } from '@stencil/core/testing';
import { TodoList } from './todo-list';
import { store } from '../../../reduxStore/store';


describe('TodoList', () => {

  jest.mock('../../../reduxStore/store', () => ({
    store: {
      getState: jest.fn(),
      subscribe: jest.fn(),
      dispatch: jest.fn(),
    },
  }));

  it('renders correctly', async () => {     //✅
    const page = await newSpecPage({
      components: [TodoList],
      template: () => <todo-list></todo-list>,
    });

    expect(await page.waitForChanges()).not.toBeNull();

    expect(page.root.shadowRoot.querySelector('h1').textContent).toBe('To-Do List');
    expect(page.root.shadowRoot.querySelector('p').textContent).toBe('Tasks left: 0');
    expect(page.root.shadowRoot.querySelector('ul').innerHTML.length).toBe(0);

    console.log(page.root.shadowRoot.innerHTML);

  });

  it('displays the correct number of tasks', async () => { //✅
    const page = await newSpecPage({
      components: [TodoList],
      template: () => <todo-list></todo-list>,
    });

    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('p').textContent).toBe('Tasks left: 0');

    const task: Task = { taskText: 'Test task', isChecked: false };

    store.dispatch(addTodo(task));
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('p').textContent).toBe('Tasks left: 1');

    store.dispatch(addTodo(task));
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('p').textContent).toBe('Tasks left: 2');
  });

  it('adds a new task when the form is submitted', async () => {

  });

  it('checks if adding todos works fine', async () => { //✅
    const page = await newSpecPage({
      components: [TodoList],
      template: () => (<todo-list></todo-list>),
    });

    const task: Task = { taskText: 'Test task', isChecked: false };

    store.dispatch(addTodo(task));

    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('ul').childNodes.length).toBe(1)

    store.dispatch(addTodo(task));

    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('ul').childNodes.length).toBe(2)

    store.dispatch(addTodo(task));

    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('ul').childNodes.length).toBe(3)
  });


  //  todo look at this again should be possible
  it('updates the input value when typing', async () => {
    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    const input = page.root.shadowRoot.querySelector('input') as HTMLInputElement;
    input.value = 'New Task Text';
    input.dispatchEvent(new Event('input'));

    await page.waitForChanges();

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_NEW_TASK_TEXT',
      payload: 'New Task Text',
    });
  });


//
//   Test toggle-todo in todo item-item.spec.tsx
//
//    all the logic for the toggle is in the item and not the list so it would be much prettier to test it in there
//
//    even more importantly that also fixes a lot of problems. This doesnt work because somehow it isn't allowed for me to go through the second shadow root.
//
//    if it is needed to test: just test if it is reached till a certain point and not till the actual toggle logic.
//
//    ❌ write this test into the item not the list...
  it('toggles a task when it is completed', async () => {

    const page = await newSpecPage({
      components: [TodoList],
      template: () => (<todo-list></todo-list>),
    });

    const task: Task = { taskText: 'Test task', isChecked: false };

    store.dispatch(addTodo(task));
    store.dispatch(addTodo(task));
    await page.waitForChanges();

    console.log(page.root.shadowRoot.innerHTML);

    //expect(await page.waitForChanges()).not.toBeNull();

    const list = page.root.shadowRoot.querySelector('ul');
    list.childNodes.forEach((item) => console.log(item.nodeName));
    //console.log(page.root.shadowRoot.innerHTML);
    const checkbox = page.root.shadowRoot.querySelector('input[type="checkbox"]') as HTMLInputElement;

    expect(checkbox).not.toBeNull();
    expect(checkbox.checked).toBe(false);
  });
});


/*
import { newSpecPage } from '@stencil/core/testing';
import { TodoList } from './todo-list';
import { Task } from './task';
import { h } from '@stencil/core';

// Mock the store and action creators
jest.mock('../../../reduxStore/store', () => ({
  store: {
    dispatch: jest.fn(),
    getState: jest.fn(() => ({
      todos: [],
      newTaskText: ''
    })),
    subscribe: jest.fn((callback) => callback())
  },
  addTodo: jest.fn(),
  toggleTodo: jest.fn()
}));

import { store, addTodo, toggleTodo } from '../../../reduxStore/store';

describe('todo-list', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /*
  it('renders the component correctly with no tasks', async () => {

  });


  it('displays the correct number of tasks', async () => {
    const task: Task = { taskText: 'Test task', isChecked: false };

    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    store.dispatch(addTodo(task));

    console.log(page.root.shadowRoot.innerHTML);

    const taskItems = page.root.shadowRoot.querySelectorAll('todo-item');
    expect(taskItems.length).toBe(1);

    const tasksLeftText = page.root.shadowRoot.querySelector('p').textContent;
    expect(tasksLeftText).toBe('Tasks left: 1');
  });

  it('adds a new task when the form is submitted', async () => {
    const taskText = 'New Task';

    (store.getState as jest.Mock).mockReturnValueOnce({
      todos: [],
      newTaskText: taskText
    });

    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    const form = page.root.shadowRoot.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));

    await page.waitForChanges();

    // Verify that dispatch was called with addTodo action
    expect(store.dispatch).toHaveBeenCalledWith(addTodo(expect.any(Task)));
    expect(addTodo).toHaveBeenCalledWith(expect.any(Task));
  });

  it('toggles a task when it is completed', async () => {
    const task: Task = { taskText: 'Test task', isChecked: false };

    (store.getState as jest.Mock).mockReturnValueOnce({
      todos: [task],
      newTaskText: ''
    });

    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    const todoItem = page.root.shadowRoot.querySelector('todo-item');
    const event = new CustomEvent('todoCompleted', {
      detail: task,
    });

    todoItem.dispatchEvent(event);
    await page.waitForChanges();

    expect(store.dispatch).toHaveBeenCalledWith(toggleTodo(task));
  });

  it('updates the input value when typing', async () => {
    (store.getState as jest.Mock).mockReturnValueOnce({
      todos: [],
      newTaskText: ''
    });

    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    const input = page.root.shadowRoot.querySelector('input') as HTMLInputElement;
    input.value = 'New Task Text';
    input.dispatchEvent(new Event('input'));

    await page.waitForChanges();

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_NEW_TASK_TEXT',
      payload: 'New Task Text',
    });
  });
});
*/


/*
import { newSpecPage } from '@stencil/core/testing';
import { TodoList } from './todo-list';
import { TodoItem } from '../list-items/todo-item';
import * as ReduxStore from '../../../reduxStore/store';
import { Task } from './task';
import { addTodo, store, toggleTodo } from '../../../reduxStore/store';
import mock = jest.mock;

describe('todo-list', () => {

  let mockFunc;
  beforeEach(() => {

    const dummyStore = { todos: [{ taskText: 'hello '}], newTaskText: ''} as ReduxStore.TodoState;

    mockFunc =  jest.fn().mockReturnValue(dummyStore);
    //jest.spyOn(ReduxStore, 'store');

    //const getStateSpy = jest.spyOn(ReduxStore.store, 'getState'),
    /*
    store.getState = jest.fn(() => ({
      todos: [],
      newTaskText: '',
    }));

    store.subscribe = jest.fn((callback) => callback());
    store.dispatch = jest.fn();

  });

  it('renders the component correctly', async () => {
    const page = await newSpecPage({
      components: [TodoList, TodoItem],
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

  it('displays the correct number of tasks', async () => {
    const task = new Task('Task 1');
    /*
    store.getState = jest.fn(() => ({
      todos: [{ taskName: 'Task1' } as Task],
      newTaskText: '',
    }));



    const page = await newSpecPage({
      components: [TodoList, TodoItem],
      html: `<todo-list></todo-list>`,
    });

    await page.waitForChanges();
    console.log(mockFunc());
    const taskItems = page.root.querySelectorAll('todo-item');
    expect(taskItems.length).toBe(1);

    const tasksLeftText = page.root.querySelector('p').textContent;
    expect(tasksLeftText).toBe('Tasks left: 1');
  });

  it('adds a new task when the form is submitted', async () => {
    store.getState = jest.fn(() => ({
      todos: [],
      newTaskText: 'New Task',
    }));

    const page = await newSpecPage({
      components: [TodoList, TodoItem],
      html: `<todo-list></todo-list>`,
    });

    const form = page.root.querySelector('form');
    expect(form).not.toBeNull();

    form.dispatchEvent(new Event('submit'));
    await page.waitForChanges();

    expect(store.dispatch).toHaveBeenCalledWith(addTodo(expect.any(Task)));
  });

  it('updates the task list when a task is completed', async () => {
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
    expect(todoItem).not.toBeNull();

    const event = new CustomEvent('todoCompleted', { detail: task });
    todoItem.dispatchEvent(event);
    await page.waitForChanges();

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
    expect(input).not.toBeNull();

    input.value = 'New Task Text';
    input.dispatchEvent(new Event('input'));

    await page.waitForChanges();

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_NEW_TASK_TEXT',
      payload: 'New Task Text',
    });
  });
});
*/
