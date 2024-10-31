import { newSpecPage } from '@stencil/core/testing';
import { TodoList } from '../todo-list';

describe('TodoList Dark Mode', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize dark mode based on localStorage', async () => {
    localStorage.setItem('darkMode', 'true');
    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });
    await page.waitForChanges();
    expect(document.documentElement.classList.contains('dark-mode')).toBe(true);
  });

  it('should toggle dark mode on button click', async () => {
    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    const button = page.root.shadowRoot.querySelector('button');
    button.click(); // Toggle on
    await page.waitForChanges();
    expect(page.rootInstance.darkMode).toBe(true);
    expect(localStorage.getItem('darkMode')).toBe('true');

    button.click(); // Toggle off
    await page.waitForChanges();
    expect(page.rootInstance.darkMode).toBe(false);
    expect(localStorage.getItem('darkMode')).toBe('false');
  });
});
