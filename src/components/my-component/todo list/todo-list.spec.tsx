import { h } from '@stencil/core';
import { addTodo } from '../../../reduxStore/store';
import { Task } from './task';

import { newSpecPage } from '@stencil/core/testing';
import { store, resetStore } from '../../../reduxStore/store';
import { TodoList } from './todo-list';



jest.mock('../../../reduxStore/store', () => ({
  store: {
    dispatch: jest.fn(),
    getState: jest.fn(() => ({
      todos: [],
      newTaskText: '',
    })),
    resetStore: jest.fn(),
    subscribe: jest.fn(),
  },
}));


describe('TodoList tests', () => {

  beforeEach(async () => {
    store.dispatch(resetStore());
  })

  it('renders correctly', async () => {     //✅
    const page = await newSpecPage({
      components: [TodoList],
      template: () => <todo-list></todo-list>,
    });

    expect(await page.waitForChanges()).not.toBeNull();

    expect(page.root.shadowRoot.querySelector('h1').textContent).toBe('To-Do List');
    expect(page.root.shadowRoot.querySelector('p').textContent).toBe('Tasks left: 0');
    expect(page.root.shadowRoot.querySelector('ul').innerHTML.length).toBe(0);
  });

  it('displays the correct number of tasks', async () => {     //✅
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
    window.location.reload();
  });

  it('checks if displaying number of todos works fine', async () => {     //✅

    const page1 = await newSpecPage({
      components: [TodoList],
      template: () => (<todo-list></todo-list>),
    });

    const task: Task = { taskText: 'Test task', isChecked: false };

    await page1.waitForChanges();

    store.dispatch(addTodo(task));

    await page1.waitForChanges();

    expect(page1.root.shadowRoot.querySelector('ul').childNodes.length).toBe(1);

    store.dispatch(addTodo(task));

    await page1.waitForChanges();

    expect(page1.root.shadowRoot.querySelector('ul').childNodes.length).toBe(2);

    store.dispatch(addTodo(task));

    await page1.waitForChanges();

    expect(page1.root.shadowRoot.querySelector('ul').childNodes.length).toBe(3);
  });

  it('renders the correct number of TodoItem components', async () => {
    const task: Task = { taskText: 'Test task', isChecked: false };

    const page = await newSpecPage({
      components: [TodoList],
      template: () => (<todo-list></todo-list>),
    });

    store.dispatch(addTodo(task));
    store.dispatch(addTodo(task));
    await page.waitForChanges();

    const todoItems = page.root.shadowRoot.querySelectorAll('todo-item');
    expect(todoItems.length).toBe(2);
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
  xit('toggles a task when it is completed', async () => {

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
