import type { Components, JSX } from "../types/components";

interface TodoList extends Components.TodoList, HTMLElement {}
export const TodoList: {
    prototype: TodoList;
    new (): TodoList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
