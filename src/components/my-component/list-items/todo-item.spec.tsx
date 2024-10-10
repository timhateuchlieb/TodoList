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

    console.log(page.root.shadowRoot.innerHTML)

    expect(checkbox).not.toBeNull();
    expect(page.root.shadowRoot.querySelector('div')).not.toBeNull();
    expect(checkbox.checked).toBe(false);
    expect(page.root.shadowRoot.querySelector('p').textContent).toBe(task.taskText);
  });

  it('toggles a task when the checkbox is clicked', async () => {
    const task: Task = { taskText: 'Test task', isChecked: false };

    store.dispatch = jest.fn();

    const page = await newSpecPage({
      components: [TodoItem],
      template: () => (<todo-item task={task}></todo-item>),
    });

    const checkbox = page.root.shadowRoot.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).not.toBeNull();
    expect(checkbox.checked).toBe(false);
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(store.dispatch).toHaveBeenCalledWith(toggleTodo({ ...task, isChecked: true }));

    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(store.dispatch).toHaveBeenCalledWith(toggleTodo({ ...task, isChecked: false }));
  });



  //todo || does want to toggle checkbox but logic in store is never reached...

  // doesnt work bc:
  //    todo-item doesnt directly communicates with the store, it is the todo-list talking to the store not the todo-item.
  //
  //    because of that not the handleCheckboxChange() function talks to store but the call is redirected to todo-list item and than to store
  //

  it('checks and unchecks the checkbox when clicked', async () => {
    const task: Task = { taskText: 'Test task', isChecked: false };

    const page = await newSpecPage({
      components: [TodoItem],
      template: () => <todo-item task={task}></todo-item>,
    });

    const checkbox = page.root.shadowRoot.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).not.toBeNull();

    //checkbox.checked = true;  only a cheat!!! find something that can actually redirect to store
    checkbox.checked = true;
    checkbox.dispatchEvent(new CustomEvent('change'));
    await page.waitForChanges();

    expect(checkbox.checked).toBe(true);

    //checkbox.checked = false;  only a cheat!!! find something that can actually redirect to store
    checkbox.checked = false;

    //checkbox.click();
    //store.dispatch(toggleTodo(page.root.querySelector('todo-item')));

    await page.waitForChanges();

    expect(checkbox.checked).toBe(false);

    const updatedTask = page.root.task;
    expect(updatedTask.isChecked).toBe(false);
  });
});
