import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { store } from '../../../../reduxStore/store';
import { TodoList } from '../todo-list';

describe('TodoList Component Rendering', () => {
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

    expect(page.root.shadowRoot.querySelector('h1').textContent).toBe('To-Do List');
    expect(page.root.shadowRoot.querySelector('p').textContent).toBe('Tasks left: 0');
    expect(page.root.shadowRoot.querySelector('ul').childElementCount).toBe(0);
  });
});
