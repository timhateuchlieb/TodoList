import store from '../store/store';
import { updateNewTaskText, addTodo, toggleTodo } from '../actions/actions';
import { selectState } from '../../selectors/selectorSelector';


describe('Redux Store', () => {
  it('should return the initial state', () => {
    const initialState = selectState();
    expect(initialState.todos).toEqual([]);
    expect(initialState.newTaskText).toBe('');
  });

  it('should handle UPDATE_NEW_TASK_TEXT', () => {
    store.dispatch(updateNewTaskText('Learn Redux'));
    const state = selectState();
    expect(state.newTaskText).toBe('Learn Redux');
  });

  it('should handle ADD_TODO', () => {
    const task = { taskText: 'New task', isChecked: false };
    store.dispatch(addTodo(task));
    const state = selectState();
    expect(state.todos).toContainEqual(task);
    expect(state.newTaskText).toBe('');
  });

  it('should handle TOGGLE_TODO', () => {
    const task = { taskText: 'Toggle this task', isChecked: false };
    store.dispatch(addTodo(task));
    store.dispatch(toggleTodo(task));

    const state = selectState();
    const toggledTask = state.todos.find(t => t.taskText === 'Toggle this task');
    expect(toggledTask?.isChecked).toBe(true);
  });
});
