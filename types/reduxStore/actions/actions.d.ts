import { Task } from '../../components/TodoList/todo list/task';
export declare const addTodo: (task: Task) => {
    type: string;
    payload: Task;
};
export declare const toggleTodo: (task: Task) => {
    type: string;
    payload: Task;
};
export declare const updateNewTaskText: (text: string) => {
    type: string;
    payload: string;
};
export declare const toggleDarkMode: (newDarkModeState: boolean) => {
    type: string;
    payload: boolean;
};
export declare const deleteTodo: (task: Task) => {
    type: string;
    payload: Task;
};
export declare const updateAccordingToLocalStorage: () => {
    type: string;
};
export declare const updateAccordingToLocalStorageError: () => {
    type: string;
};
export declare const updateAccordingToLocalStorageSuccess: (state: any) => {
    type: string;
    payload: any;
};
