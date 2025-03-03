'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-dc89263c.js');
const appGlobals = require('./app-globals-3a1e7e63.js');

/*
 Stencil Client Patch Browser v4.23.0 | MIT Licensed | https://stenciljs.com
 */
var patchBrowser = () => {
  const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('component.cjs.js', document.baseURI).href));
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return index.promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["todo-item_2.cjs",[[1,"todo-list",{"tasks":[32],"darkMode":[32],"newTaskText":[32]}],[1,"todo-item",{"task":[16]}]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=component.cjs.js.map