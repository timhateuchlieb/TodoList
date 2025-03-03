import { p as promiseResolve, b as bootstrapLazy } from './index-816b38d6.js';
export { s as setNonce } from './index-816b38d6.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v4.23.0 | MIT Licensed | https://stenciljs.com
 */
var patchBrowser = () => {
  const importMeta = import.meta.url;
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await globalScripts();
  return bootstrapLazy([["todo-item_2",[[1,"todo-list",{"tasks":[32],"darkMode":[32],"newTaskText":[32]}],[1,"todo-item",{"task":[16]}]]]], options);
});

//# sourceMappingURL=component.js.map