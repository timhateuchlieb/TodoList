import type { Components, JSX } from "../types/components";

interface TodoItem extends Components.TodoItem, HTMLElement {}
export const TodoItem: {
    prototype: TodoItem;
    new (): TodoItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
