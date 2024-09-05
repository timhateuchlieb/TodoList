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
        { src: 'script.js', dest: '' },
        { src: 'style.css', dest: '' },
        { src: 'list-item.css', dest: '' },
        { src: 'list.css', dest: '' },
      ],
    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
