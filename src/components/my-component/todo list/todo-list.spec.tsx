import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { store } from '../../../reduxStore/store';
import { TodoList } from './todo-list';

describe('TodoList Component with Store Mocked', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the TodoList component correctly', async () => {
    jest.spyOn(store, 'getState').mockReturnValue({
      todos: [],
      newTaskText: '',
    });

    const page = await newSpecPage({
      components: [TodoList],
      template: () => <todo-list></todo-list>,
    });

    await page.waitForChanges();

    console.log(page.root.shadowRoot.innerHTML);

    expect(page.root.shadowRoot.querySelector('h1').textContent).toBe('To-Do List');
    expect(page.root.shadowRoot.querySelector('p').textContent).toBe('Tasks left: 0');
    expect(page.root.shadowRoot.querySelector('ul').childElementCount).toBe(0);
  });

  it('subscribes to store updates on load and updates tasks', async () => {
    const mockUnsubscribe = jest.fn();
    const subscribeSpy = jest.spyOn(store, 'subscribe').mockReturnValue(mockUnsubscribe);
    jest.spyOn(store, 'getState').mockReturnValue({
      todos: [{ taskText: 'Task 1', isChecked: false }],
      newTaskText: '',
    });
    await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });
    expect(subscribeSpy).toHaveBeenCalled();
    subscribeSpy.mockRestore();
  });

  it('dispatches addTodo() action on form submission', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    jest.spyOn(store, 'getState').mockReturnValue({
      todos: [],
      newTaskText: 'New Task',
    });

    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    await page.waitForChanges();

    const form = page.root.shadowRoot.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    await page.waitForChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
      type: 'ADD_TODO',
      payload: { taskText: 'New Task', isChecked: false },
    }));

    dispatchSpy.mockRestore();
  });

  it('dispatches UPDATE_NEW_TASK_TEXT action on input change', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    jest.spyOn(store, 'getState').mockReturnValue({
      todos: [],
      newTaskText: 'hallo',
    });

    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    await page.waitForChanges();

    const input = page.root.shadowRoot.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('hallo');
    input.value = 'New Task Text';
    input.dispatchEvent(new Event('input'));

    await page.waitForChanges();

    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_NEW_TASK_TEXT', payload: 'New Task Text' });

    dispatchSpy.mockRestore();
  });

  it('dispatches toggleTodo on handleTaskUpdated', async () => {
    const task = { taskText: 'Test task', isChecked: false };
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    jest.spyOn(store, 'getState').mockReturnValue({
      todos: [task],
      newTaskText: '   ',
    });

    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    await page.waitForChanges();

    page.root.shadowRoot.querySelector('todo-item').dispatchEvent(
      new CustomEvent('todoCompleted', { detail: task, bubbles: true, composed: true })
    );

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'TOGGLE_TODO',
        payload: task,
      })
    );

    dispatchSpy.mockRestore();
  });

  it('does not dispatch addTodo with empty or whitespace-only input', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    jest.spyOn(store, 'getState').mockReturnValue({
      todos: [],
      newTaskText: '   ', // whitespace-only
    })

    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    const form = page.root.shadowRoot.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    await page.waitForChanges();
    expect(dispatchSpy).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'ADD_TODO' }));

    dispatchSpy.mockRestore();
  });


  it('should initialize dark mode based on localStorage', async () => {
    localStorage.setItem('darkMode', 'true');

    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    await page.waitForChanges();

    expect(document.documentElement.classList.contains('dark-mode')).toBe(true);
  });

  it('should toggle dark mode on button click', async () => {
    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    await page.waitForChanges();

    const button = page.root.shadowRoot.querySelector('button');

    expect(button).not.toBeNull();

    button.click();
    await page.waitForChanges();

    expect(page.rootInstance.darkMode).toBe(true);
    expect(localStorage.getItem('darkMode')).toBe('true');

    button.click();
    await page.waitForChanges();

    expect(page.rootInstance.darkMode).toBe(false);
    expect(localStorage.getItem('darkMode')).toBe('false');
  });

  it('calls unsubscribe on component disconnection', async () => {
    const unsubscribeMock = jest.fn();
    jest.spyOn(store, 'subscribe').mockReturnValue(unsubscribeMock);

    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    page.root.remove();

    expect(unsubscribeMock).toHaveBeenCalled();
  });
});
