import { EventEmitter } from '../../../stencil-public-runtime';
import { Task } from '../todo list/task';
export declare class TodoItem {
    task: Task;
    todoCompleted: EventEmitter<Task>;
    handleCheckboxChange(): void;
    render(): any;
}
