import { b as bootstrapLazy } from './index-816b38d6.js';
export { s as setNonce } from './index-816b38d6.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await globalScripts();
  return bootstrapLazy([["todo-item_2",[[1,"todo-list",{"tasks":[32],"darkMode":[32],"newTaskText":[32]}],[1,"todo-item",{"task":[16]}]]]], options);
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map