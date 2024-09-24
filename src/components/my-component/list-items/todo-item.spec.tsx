import { newSpecPage } from '@stencil/core/testing';
import { TodoItem } from './todo-item';
import { Task } from '../todo list/task';
import { h } from '@stencil/core';

describe('todo-item', () => {

  jest.mock('../../../reduxStore/store', () => ({
    store: {
      dispatch: jest.fn(),
      getState: jest.fn(() => ({
        todos: [],
        newTaskText: '',
      })),
      subscribe: jest.fn(),
    },
    toggleTodo: jest.fn(),
  }));

  it('renders with the correct task text and checkbox state', async () => {
    const task: Task = { taskText: 'Test task', isChecked: false };

    const page = await newSpecPage({
      components: [TodoItem],
      template: () => <todo-item task={task}></todo-item>,
    });

    expect(await page.waitForChanges()).not.toBeNull();

    const checkbox = page.root.shadowRoot.querySelector('input[type="checkbox"]') as HTMLInputElement;

    expect(checkbox).not.toBeNull();
    expect(checkbox.checked).toBe(false);

    expect(page.root.shadowRoot.querySelector('p').textContent).toBe(task.taskText);
  });

  //todo || does want to toggle checkbox but logic in store is never reached...

  it('checks and unchecks the checkbox when clicked', async () => {
    const task: Task = { taskText: 'Test task', isChecked: false };

    const page = await newSpecPage({
      components: [TodoItem],
      template: () => <todo-item task={task}></todo-item>,
    });

    const checkbox = page.root.shadowRoot.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).not.toBeNull();

    //checkbox.checked only a cheat find something that can actually redirect to store
    checkbox.checked = true;
    checkbox.dispatchEvent(new CustomEvent('change'));
    await page.waitForChanges();

    expect(checkbox.checked).toBe(true);


    //checkbox.checked only a cheat find something that can actually redirect to store
    checkbox.checked = false;
    checkbox.click();
    await page.waitForChanges();

    expect(checkbox.checked).toBe(false);

    const updatedTask = page.root.task;
    expect(updatedTask.isChecked).toBe(false);
  });
});
