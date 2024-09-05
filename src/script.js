document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  const checkbox = document.getElementById('todo-checkbox');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = input.value.trim();
    if (task) {
      addTodo(task);
      input.value = '';
    }
  });

  function addTodo(task) {
    const li = document.createElement('li');

    const listItem = document.createElement('list-item');
    listItem.setAttribute('task', task);

    li.appendChild(listItem);
    todoList.appendChild(li);
  }
});
