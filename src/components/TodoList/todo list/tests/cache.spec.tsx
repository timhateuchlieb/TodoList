import { Task } from '../task';
import store from '../../../../reduxStore/store/store';
import { addTodo, toggleTodo } from '../../../../reduxStore/actions/actions';

describe('Redux Store Persistence with localStorage', () => {

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('saves to localStorage when a task is added', () => {
    const task: Task = { taskText: 'New Task', isChecked: false };
    store.dispatch(addTodo(task));

    const savedState = JSON.parse(localStorage.getItem('todoState')!);
    expect(savedState.todos).toContainEqual(task);
    expect(savedState.todos.length).toBe(1);
  });

  it('updates localStorage when a task is toggled', () => {
    const task: Task = { taskText: 'New Task', isChecked: false };
    store.dispatch(addTodo(task));

    store.dispatch(toggleTodo(task));

    const savedState = JSON.parse(localStorage.getItem('todoState')!);
    expect(savedState.todos[0].isChecked).toBe(true);
  });

});
