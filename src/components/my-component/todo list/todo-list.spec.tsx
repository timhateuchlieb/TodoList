import { h } from '@stencil/core';
import { addTodo, toggleTodo } from '../../../reduxStore/store';
import { Task } from './task';
import { newSpecPage } from '@stencil/core/testing';
import { store } from '../../../reduxStore/store';
import { TodoList } from './todo-list';

describe('TodoList Component with Store Mocked', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the TodoList component correctly', async () => {
    const page = await newSpecPage({
      components: [TodoList],
      template: () => <todo-list></todo-list>,
    });

    expect(await page.waitForChanges()).not.toBeNull();
    expect(page.root.shadowRoot.querySelector('h1').textContent).toBe('To-Do List');
    expect(page.root.shadowRoot.querySelector('p').textContent).toBe('Tasks left: 0');
    expect(page.root.shadowRoot.querySelector('ul').childElementCount).toBe(0);
  });

  it('calls store.getState to retrieve tasks and display them', async () => {
    const getStateSpy = jest.spyOn(store, 'getState').mockReturnValue({
      todos: [
        { taskText: 'Test task 1', isChecked: false },
        { taskText: 'Test task 2', isChecked: true },
      ],
      newTaskText: '',
    });

    const page = await newSpecPage({
      components: [TodoList],
      template: () => <todo-list></todo-list>,
    });

    await page.waitForChanges();

    expect(getStateSpy).toHaveBeenCalledTimes(1);

    getStateSpy.mockRestore();
  });

  it('dispatches addTodo action when a new task is added', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const task: Task = { taskText: 'Test task', isChecked: false };

    const page = await newSpecPage({
      components: [TodoList],
      template: () => <todo-list></todo-list>,
    });

    store.dispatch(addTodo(task));

    expect(dispatchSpy).toHaveBeenCalledWith(addTodo(task));
    expect(dispatchSpy).toHaveBeenCalledTimes(1);

    dispatchSpy.mockRestore();
  });

  it('updates the input value when typing, but does not change store state', async () => {
    const getStateSpy = jest.spyOn(store, 'getState').mockReturnValue({
      todos: [],
      newTaskText: '',
    });

    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    const input = page.root.shadowRoot.querySelector('input') as HTMLInputElement;
    input.value = 'New Task Text';
    input.dispatchEvent(new Event('input'));

    await page.waitForChanges();

    expect(input.value).toBe('New Task Text');
    expect(store.getState().newTaskText).toBe('');

    getStateSpy.mockRestore();
  });
});
