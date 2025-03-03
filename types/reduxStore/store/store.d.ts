import { Task } from '../../components/TodoList/todo list/task';
export interface TodoState {
    todos: Task[];
    newTaskText: string;
    darkMode: boolean;
}
declare const store: import("redux").Store<TodoState, any, unknown> & {
    dispatch: unknown;
};
export default store;
