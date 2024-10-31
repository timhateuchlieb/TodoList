import { newSpecPage } from '@stencil/core/testing';
import { store } from '../../../../reduxStore/store';
import { TodoList } from '../todo-list';

describe('TodoList Component Subscription', () => {
  it('subscribes to store updates on load', async () => {
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
