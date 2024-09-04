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
      ],
    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
