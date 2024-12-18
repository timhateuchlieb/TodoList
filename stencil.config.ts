import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'component',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        { src: 'components/todo list/todo-list.css', dest: 'todo-list.css' },
        { src: 'components/list-items/todo-item.css', dest: 'todo-item.css' },
        { src: 'components/style.css', dest: 'style.css' }
      ]
    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
