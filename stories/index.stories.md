```js script
import { html } from '@open-wc/demoing-storybook';
import { boolean, withKnobs } from 'storybook-prebuilt/addon-knobs';

import '../dist/index.js';

export default {
  title: 'MarkdownEditor',
  component: 'mwc-markdown-editor',
  options: {
    selectedPanel: 'storybookjs/knobs/panel',
  },
  decorators: [withKnobs],
};
```

# MarkdownEditor

A component for editing markdown

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
  <mwc-markdown-editor
    value="Hi **you**"
    .disabled="${boolean('disabled', false)}"
  ></mwc-markdown-editor>
`;
```
