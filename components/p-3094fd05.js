import { p as proxyCustomElement, H, c as createEvent, h } from './p-e500cf36.js';

const todoItemCss = "div{display:flex;align-items:center;justify-content:start}input[type=\"checkbox\"]{margin-right:10px;flex-shrink:0}p{margin:0;line-height:1.5;flex-grow:1}.completed{text-decoration:line-through;color:gray}:host{display:block}";
const TodoItemStyle0 = todoItemCss;

const TodoItem = /*@__PURE__*/ proxyCustomElement(class TodoItem extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.todoCompleted = createEvent(this, "todoCompleted", 7);
        this.task = undefined;
    }
    handleCheckboxChange() {
        this.todoCompleted.emit(this.task);
    }
    render() {
        return (h("div", { key: '834ba748a110faa50669ff6da0639062a8dd6795' }, h("input", { key: '5693a182e91e34bfa1c9d44b0e2ffc759f94d5e4', type: "checkbox", checked: this.task.isChecked, onChange: () => this.handleCheckboxChange() }), h("p", { key: '5caf2ab9a6140e42fc2b00edfeaccf9740f72d70', class: this.task.isChecked ? 'completed' : '' }, this.task.taskText)));
    }
    static get style() { return TodoItemStyle0; }
}, [1, "todo-item", {
        "task": [16]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["todo-item"];
    components.forEach(tagName => { switch (tagName) {
        case "todo-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, TodoItem);
            }
            break;
    } });
}
defineCustomElement();

export { TodoItem as T, defineCustomElement as d };

//# sourceMappingURL=p-3094fd05.js.map