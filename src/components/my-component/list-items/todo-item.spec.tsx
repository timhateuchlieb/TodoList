import { newSpecPage } from '@stencil/core/testing';
import { TodoItem } from './todo-item';
import { Task } from '../todo list/task';
import { h } from '@stencil/core';
import { store, toggleTodo } from '../../../reduxStore/store';

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

describe('todo-item', () => {

  it('renders with the correct task text and checkbox state', async () => {   //✅
    const task: Task = { taskText: 'Test task', isChecked: false };

    const page = await newSpecPage({
      components: [TodoItem],
      template: () => <todo-item task={task}></todo-item>,
    });

    expect(await page.waitForChanges()).not.toBeNull();

    const checkbox = page.root.shadowRoot.querySelector('input[type="checkbox"]') as HTMLInputElement;

    expect(checkbox).not.toBeNull();
    expect(page.root.shadowRoot.querySelector('div')).not.toBeNull();
    expect(checkbox.checked).toBe(false);
    expect(page.root.shadowRoot.querySelector('p').textContent).toBe(task.taskText);
  });

  it('calls CheckboxChange method when the checkbox is clicked', async () => {
    const task: Task = { taskText: 'Test task', isChecked: false };

    store.dispatch = jest.fn();

    const page = await newSpecPage({
      components: [TodoItem],
      template: () => (<todo-item task={task}></todo-item>),
    });

    await page.waitForChanges();

    const checkbox = page.root.shadowRoot.querySelector('input[type="checkbox"]') as HTMLInputElement;

    expect(checkbox).not.toBeNull();
    expect(checkbox.checked).toBe(false);

    const handleCheckboxChangeSpy = jest.spyOn(page.rootInstance, 'handleCheckboxChange');

    checkbox.click();
    checkbox.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(handleCheckboxChangeSpy).toHaveBeenCalled();

    checkbox.click();
    checkbox.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(handleCheckboxChangeSpy).toHaveBeenCalledTimes(2);

    handleCheckboxChangeSpy.mockRestore();
  });

  it('updates when the task prop changes', async () => {  //✅
    const initialTask: Task = { taskText: 'Initial Task', isChecked: false };
    const updatedTask: Task = { taskText: 'Updated Task', isChecked: true };

    const page = await newSpecPage({
      components: [TodoItem],
      template: () => <todo-item task={initialTask}></todo-item>,
    });

    expect(page.root.shadowRoot.querySelector('p').textContent).toBe('Initial Task');
    expect((page.root.shadowRoot.querySelector('input[type="checkbox"]') as HTMLInputElement).checked).toBe(false);

    page.root.task = updatedTask;
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('p').textContent).toBe('Updated Task');
    expect((page.root.shadowRoot.querySelector('input[type="checkbox"]') as HTMLInputElement).checked).toBe(true);
  });
});
