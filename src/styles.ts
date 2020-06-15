import { css } from 'lit-element';

export const PROSEMIRROR_STYLES = css`
  .ProseMirror {
    position: relative;
    word-wrap: break-word;
    white-space: pre-wrap;
    -webkit-font-variant-ligatures: none;
    font-variant-ligatures: none;
    padding: 1rem;
    line-height: 1.2;
    outline: none;
    font-family: var(
      --mdc-typography-markdown-editor-font-family,
      var(--mdc-typography-font-family, Roboto, sans-serif)
    );
    font-size: var(
      --mdc-typography-markdown-editor-font-size,
      var(--mdc-typography-subtitle1-font-size, 1rem)
    );
    font-weight: var(
      --mdc-typography-markdown-editor-font-weight,
      var(--mdc-typography-subtitle1-font-weight, 400)
    );
    letter-spacing: var(
      --mdc-typography-markdown-editor-letter-spacing,
      var(--mdc-typography-subtitle1-letter-spacing, 0.009375em)
    );
  }

  .ProseMirror pre {
    white-space: pre-wrap;
  }

  .ProseMirror li {
    position: relative;
  }

  .ProseMirror p:first-child,
  .ProseMirror h1:first-child,
  .ProseMirror h2:first-child,
  .ProseMirror h3:first-child,
  .ProseMirror h4:first-child,
  .ProseMirror h5:first-child,
  .ProseMirror h6:first-child {
    margin-top: 10px;
  }

  .ProseMirror p {
    margin-bottom: 1em;
  }

  .ProseMirror-hideselection {
    caret-color: transparent;
  }

  .ProseMirror-hideselection *::selection,
  .ProseMirror-hideselection *::-moz-selection {
    background: transparent;
  }

  .ProseMirror-selectednode {
    outline: 2px solid #8cf;
  }

  /* Make sure li selections wrap around markers */
  li.ProseMirror-selectednode {
    outline: none;
  }

  li.ProseMirror-selectednode:after {
    content: '';
    position: absolute;
    left: -32px;
    right: -2px;
    top: -2px;
    bottom: -2px;
    border: 2px solid #8cf;
    pointer-events: none;
  }

  .ProseMirror-textblock-dropdown {
    min-width: 3em;
  }

  .ProseMirror-menu {
    margin: 0 -4px;
    line-height: 1;
  }

  .ProseMirror-tooltip .ProseMirror-menu {
    width: -webkit-fit-content;
    width: fit-content;
    white-space: pre;
  }

  .ProseMirror-menuitem {
    margin: 0.25rem 0.25rem 0.25rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ProseMirror-menuitem:hover {
    background-color: #f5f5f5;
  }

  .ProseMirror-menuseparator {
    margin: 0 8px;
  }

  .ProseMirror-menu-dropdown,
  .ProseMirror-menu-dropdown-menu {
    font-size: 90%;
    white-space: nowrap;
  }

  .ProseMirror-menu-dropdown {
    vertical-align: 1px;
    cursor: pointer;
    position: relative;
    padding-right: 15px;
  }

  .ProseMirror-menu-dropdown-wrap {
    padding: 1px 0 1px 4px;
    display: inline-block;
    position: relative;
  }

  .ProseMirror-menu-dropdown:after {
    content: '';
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid currentColor;
    opacity: 0.6;
    position: absolute;
    right: 4px;
    top: calc(50% - 2px);
  }

  .ProseMirror-menu-dropdown-menu,
  .ProseMirror-menu-submenu {
    position: absolute;
    background: white;
    color: #666;
    border: 1px solid #aaa;
    padding: 2px;
  }

  .ProseMirror-menu-dropdown-menu {
    z-index: 1;
    min-width: 6em;
  }

  .ProseMirror-menu-dropdown-item {
    cursor: pointer;
  }

  .ProseMirror-menu-dropdown-item:hover {
    background: #f2f2f2;
  }

  .ProseMirror-menu-dropdown-item > div {
    padding: 0.375rem 0.5rem;
  }

  .ProseMirror-menu-submenu-wrap {
    position: relative;
    margin-right: -4px;
  }

  .ProseMirror-menu-submenu-label:after {
    content: '';
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid currentColor;
    opacity: 0.6;
    position: absolute;
    right: 4px;
    top: calc(50% - 4px);
  }

  .ProseMirror-menu-submenu {
    display: none;
    min-width: 4em;
    left: 100%;
    top: -3px;
  }

  .ProseMirror-menu-active {
    background: #eee;
    border-radius: 4px;
    color: black;
  }

  .ProseMirror-menu-submenu-wrap:hover .ProseMirror-menu-submenu,
  .ProseMirror-menu-submenu-wrap-active .ProseMirror-menu-submenu {
    display: block;
  }

  .ProseMirror-menubar {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    background: white;
    min-height: 1em;
    overflow: visible;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    color: #666;
    padding: 1px 6px;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    border-bottom: 1px solid
      var(--markdown-editor-outline-idle-border-color, rgba(0, 0, 0, 0.38));
    box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  .ProseMirror-icon {
    display: inline-block;
    line-height: 0.8;
    vertical-align: -2px;
    /* Compensate for padding */
    padding: 2px 8px;
    border-radius: 4px;
    cursor: pointer;
  }

  .ProseMirror-menu-disabled {
    color: rgba(0,0,0,0.37);
    background-color: rgba(0,0,0,0.12);
    cursor: not-allowed;
  }

  .ProseMirror-menu-disabled.ProseMirror-icon {
    cursor: not-allowed;
  }

  .ProseMirror-icon svg {
    fill: currentColor;
    height: 1em;
  }

  .ProseMirror-icon span {
    vertical-align: text-top;
  }

  .ProseMirror-gapcursor {
    display: none;
    pointer-events: none;
    position: absolute;
  }

  .ProseMirror-gapcursor:after {
    content: '';
    display: block;
    position: absolute;
    top: -2px;
    width: 20px;
    border-top: 1px solid black;
    animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
  }

  @keyframes ProseMirror-cursor-blink {
    to {
      visibility: hidden;
    }
  }

  .ProseMirror-focused .ProseMirror-gapcursor {
    display: block;
  }

  /* Add space around the hr to make clicking it easier */
  .ProseMirror-example-setup-style hr {
    padding: 2px 10px;
    border: none;
    margin: 1em 0;
  }

  .ProseMirror-example-setup-style hr:after {
    content: '';
    display: block;
    height: 1px;
    background-color: silver;
    line-height: 2px;
  }

  .ProseMirror ul,
  .ProseMirror ol {
    padding-left: 30px;
  }

  .ProseMirror blockquote {
    padding-left: 1em;
    border-left: 3px solid #eee;
    margin-left: 0;
    margin-right: 0;
  }

  .ProseMirror-example-setup-style img {
    cursor: default;
  }

  .ProseMirror-invalid {
    background: #ffc;
    border: 1px solid #cc7;
    border-radius: 4px;
    padding: 5px 10px;
    position: absolute;
    min-width: 10em;
  }

  .ProseMirror h1.title.empty-node::before,
  .ProseMirror h2.instructional-prompt.empty-node::before,
  .ProseMirror h3.mechanical-promp.empty-node::before {
    content: 'Enter title here...';
  }

  .ProseMirror div.passage-subtitle.empty-node:first-child::before {
    content: 'Enter subtitle here...';
  }

  .ProseMirror div.passage-author.empty-node:first-child::before,
  .ProseMirror div.passage-cast-title.empty-node:first-child::before,
  .ProseMirror div.passage-act-title.empty-node:first-child::before,
  .ProseMirror div.passage-scene-title.empty-node:first-child::before,
  .ProseMirror div.passage-verse.empty-node:first-child::before,
  .ProseMirror div.passage-footnotes.empty-node:first-child::before,
  .ProseMirror div.paragraph.empty-node:first-child::before {
    content: 'Enter text here...';
  }

  div[contenteditable]:focus h1.title.empty-node::before,
  div[contenteditable]:focus h2.instructional-prompt.empty-node::before,
  div[contenteditable]:focus h3.mechanical-promp.empty-node::before,
  div[contenteditable]:focus
    div.passage-subtitle.empty-node:first-child::before,
  div[contenteditable]:focus div.passage-author.empty-node:first-child::before,
  div[contenteditable]:focus
    div.passage-cast-title.empty-node:first-child::before,
  div[contenteditable]:focus
    div.passage-act-title.empty-node:first-child::before,
  div[contenteditable]:focus
    div.passage-scene-title.empty-node:first-child::before,
  div[contenteditable]:focus div.passage-verse.empty-node:first-child::before,
  div[contenteditable]:focus
    div.passage-footnotes.empty-node:first-child::before,
  div[contenteditable]:focus div.paragraph.empty-node:first-child::before {
    content: '';
  }

  .ProseMirror .empty-node::before {
    position: absolute;
    color: #aaa;
    cursor: text;
    font-style: italic;
  }

  #editor,
  .editor {
    background: white;
    color: black;
    background-clip: padding-box;
    padding: 5px 0;
    margin-bottom: 23px;
  }

  drop-down-editor rich-text .inline-component-button,
  expand-collapse rich-text .inline-component-button,
  flip-reveal rich-text .inline-component-button,
  hint-list rich-text .inline-component-button,
  option-list rich-text .inline-component-button,
  plankton-passage rich-text .inline-component-button {
    pointer-events: none;
    color: lightgray;
  }

  #ProseMirror-icon-collection path {
    fill-rule: evenodd;
  }
`;
