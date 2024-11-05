import { newSpecPage } from '@stencil/core/testing';
import { TodoList } from '../todo-list';
import { store } from '../../../../reduxStore/store';

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
    expect(document.documentElement.classList.contains('darkMode')).toBe(true);
  })

  it('should toggle dark mode on button click', async () => {

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });

    const button = page.root.shadowRoot.querySelector('button');
    button.click(); // Toggle on
    await page.waitForChanges();
    expect(dispatchSpy).toHaveBeenCalled();
    expect(localStorage.getItem('darkMode')).toBe('true');

    button.click(); // Toggle off
    await page.waitForChanges();
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(localStorage.getItem('darkMode')).toBe('false');
  });
});
