import { newSpecPage } from '@stencil/core/testing';
import { TodoItem } from './todo-item';
import { Task } from '../todo list/task';

describe('todo-item', () => {
  it('renders with the correct task text and checkbox state', async () => {
    const task: Task = { taskText: 'Test task', isChecked: false };

    const page = await newSpecPage({
      components: [TodoItem],
      html: `<todo-item task='${JSON.stringify(task)}'></todo-item>`,
    });

    expect(page.root).toEqualHtml(`
      <todo-item task="{&quot;taskText&quot;:&quot;Test task&quot;,&quot;isChecked&quot;:false}">
        <template shadowrootmode="open">
          <div>
            <input type="checkbox" />
          <p>
          Test task
          </p>
            </div>
          </template>
      </todo-item>
    `);
  });

  it('checks and unchecks the checkbox when clicked', async () => {
    const task: Task = { taskText: 'Test task', isChecked: false };

    const page = await newSpecPage({
      components: [TodoItem],
      html: `<todo-item task='${JSON.stringify(task)}'></todo-item>`,
    });

    const checkbox = page.root.shadowRoot.querySelector('input[type="checkbox"]') as HTMLInputElement;

    if (!checkbox) {
      throw new Error('Checkbox element not found');
    }

    checkbox.click();
    await page.waitForChanges();

    expect(checkbox.checked).toBe(true);
    expect(page.root.task.isChecked).toBe(true);

    checkbox.click();
    await page.waitForChanges();

    expect(checkbox.checked).toBe(false);
    expect(page.root.task.isChecked).toBe(false);
  });
});
