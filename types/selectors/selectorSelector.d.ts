import { TodoState } from '../reduxStore/store/store';
export declare function selectState(): TodoState;
export declare function selectDarkModeState(): boolean;
export declare function selectAllTodos(): import("..").Task[];
export declare function selectNewTaskText(): string;
