import { Task } from './task';
export declare class TodoList {
    tasks: Task[];
    darkMode: boolean;
    newTaskText: string;
    hostElement: HTMLElement;
    private unsubscribe;
    componentWillLoad(): void;
    syncWithStore(): void;
    toggleDarkMode(): void;
    disconnectedCallback(): void;
    handleFormSubmit(event: Event): void;
    handleTaskUpdated(event: CustomEvent<Task>): void;
    handleInputChange(event: Event): void;
    render(): any;
}
