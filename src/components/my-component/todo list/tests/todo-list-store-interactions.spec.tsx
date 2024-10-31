import { newSpecPage } from '@stencil/core/testing';
import { store } from '../../../../reduxStore/store';
import { TodoList } from '../todo-list';

describe('TodoList Store Interactions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches addTodo action on form submission', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    jest.spyOn(store, 'getState').mockReturnValue({
      todos: [],
      newTaskText: 'New Task',
    });

    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    const form = page.root.shadowRoot.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await page.waitForChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
      type: 'ADD_TODO',
      payload: { taskText: 'New Task', isChecked: false },
    }));

    dispatchSpy.mockRestore();
  });

  it('does not dispatch addTodo with empty or whitespace-only input', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    jest.spyOn(store, 'getState').mockReturnValue({
      todos: [],
      newTaskText: '   ',
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

  it('dispatches toggleTodo on handleTaskUpdated', async () => {
    const task = { taskText: 'Test task', isChecked: false };
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    jest.spyOn(store, 'getState').mockReturnValue({
      todos: [task],
      newTaskText: '',
    });

    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

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
});
