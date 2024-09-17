import { addTodo, store, toggleTodo, updateNewTaskText } from '../reduxStore/store';

describe('Redux Store', () => {
  it('should return the initial state', () => {
    const initialState = store.getState();
    expect(initialState.todos).toEqual([]);
    expect(initialState.newTaskText).toBe('');
  });

  it('should handle UPDATE_NEW_TASK_TEXT', () => {
    store.dispatch(updateNewTaskText('Learn Redux'));
    const state = store.getState();
    expect(state.newTaskText).toBe('Learn Redux');
  });

  it('should handle ADD_TODO', () => {
    const task = { taskText: 'New task', isChecked: false };
    store.dispatch(addTodo(task));
    const state = store.getState();
    expect(state.todos).toContainEqual(task);
    expect(state.newTaskText).toBe('');
  });

  it('should handle TOGGLE_TODO', () => {
    const task = { taskText: 'Toggle this task', isChecked: false };
    store.dispatch(addTodo(task));
    store.dispatch(toggleTodo(task));

    const state = store.getState();
    const toggledTask = state.todos.find(t => t.taskText === 'Toggle this task');
    expect(toggledTask?.isChecked).toBe(true);
  });
});
