import { h } from "@stencil/core";
export class TodoItem {
    constructor() {
        this.task = undefined;
    }
    handleCheckboxChange() {
        this.todoCompleted.emit(this.task);
    }
    render() {
        return (h("div", { key: '834ba748a110faa50669ff6da0639062a8dd6795' }, h("input", { key: '5693a182e91e34bfa1c9d44b0e2ffc759f94d5e4', type: "checkbox", checked: this.task.isChecked, onChange: () => this.handleCheckboxChange() }), h("p", { key: '5caf2ab9a6140e42fc2b00edfeaccf9740f72d70', class: this.task.isChecked ? 'completed' : '' }, this.task.taskText)));
    }
    static get is() { return "todo-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["todo-item.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["todo-item.css"]
        };
    }
    static get properties() {
        return {
            "task": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "Task",
                    "resolved": "Task",
                    "references": {
                        "Task": {
                            "location": "import",
                            "path": "../todo list/task",
                            "id": "src/components/TodoList/todo list/task.ts::Task"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
            }
        };
    }
    static get events() {
        return [{
                "method": "todoCompleted",
                "name": "todoCompleted",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "Task",
                    "resolved": "Task",
                    "references": {
                        "Task": {
                            "location": "import",
                            "path": "../todo list/task",
                            "id": "src/components/TodoList/todo list/task.ts::Task"
                        }
                    }
                }
            }];
    }
}
//# sourceMappingURL=todo-item.js.map
