'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-dc89263c.js');
const appGlobals = require('./app-globals-3a1e7e63.js');

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["todo-item_2.cjs",[[1,"todo-list",{"tasks":[32],"darkMode":[32],"newTaskText":[32]}],[1,"todo-item",{"task":[16]}]]]], options);
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map