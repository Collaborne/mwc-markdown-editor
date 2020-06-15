```js script
import { html } from '@open-wc/demoing-storybook';
import '../dist/mwc-markdown-editor.js';

export default {
  title: 'MarkdownEditor',
  component: 'mwc-markdown-editor',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# MarkdownEditor

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add mwc-markdown-editor
```

```js
import 'mwc-markdown-editor/mwc-markdown-editor.js';
```

```js preview-story
export const Simple = () => html`
  <mwc-markdown-editor></mwc-markdown-editor>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <mwc-markdown-editor title="Hello World"></mwc-markdown-editor>
`;
```
