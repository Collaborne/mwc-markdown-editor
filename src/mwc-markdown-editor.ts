import { css, html, LitElement, property, query } from 'lit-element';

import '@material/mwc-icon';
import { baseKeymap } from 'prosemirror-commands';
import { dropCursor } from 'prosemirror-dropcursor';
import { buildKeymap } from 'prosemirror-example-setup';
import { gapCursor } from 'prosemirror-gapcursor';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { defaultMarkdownParser, defaultMarkdownSerializer, schema } from 'prosemirror-markdown';
import { menuBar } from 'prosemirror-menu';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { buildInputRules } from './prosemirror/input-rules';
import { buildMenuItems } from './prosemirror/menu';
import './prosemirror/prompt-dialog';
import { PromptDialog } from './prosemirror/prompt-dialog';

import { PROSEMIRROR_STYLES } from './styles';

export class MarkdownEditor extends LitElement {
	@property({ type: String })
	public value?: string;

	@property({ type: Boolean })
	public disabled: boolean = false;

	@property({ type: Boolean })
	public focused: boolean = false;

	@property({ type: String })
	public promptCancelAction: string = 'Cancel';

	@property({ type: String })
	public promptSaveAction: string = 'Save';

	private editor?: EditorView;

	private promptResolve?: (value: string | undefined) => void;

	@query('#editor')
	private editorEl?: HTMLDivElement;

	@query('#promptDialog')
	private promptDialogEl?: PromptDialog;

	static get styles() {
		const STYLES = css`
			#editor {
				position: relative;
			}

			.notch-outlined {
				z-index: 3;
				pointer-events: none;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				border-radius: 4px;
				border: 1px solid var(--markdown-editor-outline-idle-border-color, rgba(0, 0, 0, 0.38));
			}

			#editor:not([disabled]):not([focused]):hover .notch-outlined {
				border-color: var(--markdown-editor-outline-hover-border-color, rgba(0, 0, 0, 0.87));
			}
			#editor[focused] .notch-outlined {
				border-color: var(--markdown-editor-outline-focused-border-color, var(--mdc-theme-primary, #6200ee));
				border-width: 2px;
			}
		`;

		return [PROSEMIRROR_STYLES, STYLES];
	}

	public focus() {
		if (this.editor) {
			this.editor.focus();
		}
	}

	public getValue() {
		if (!this.editor) {
			return null;
		}

		return defaultMarkdownSerializer.serialize(this.editor.state.doc);
	}

	protected render() {
		return html`
			<div id="editor" ?focused="${this.focused}" ?disabled="${this.disabled}">
				<div class="notch-outlined"></div>
			</div>
			<prompt-dialog
				id="promptDialog"
				.cancelAction="${this.promptCancelAction}"
				.saveAction="${this.promptSaveAction}"
				@save="${this.onPromptSave}"
				@cancel="${this.onPromptCancel}"
			></prompt-dialog>
		`;
	}

	protected firstUpdated() {
		const menuItems = buildMenuItems(schema, this.promptValue.bind(this));
		this.editor = new EditorView(this.editorEl!, {
			editable: () => !this.disabled,
			state: EditorState.create({
				doc: defaultMarkdownParser.parse(this.value || ''),
				plugins: [
					buildInputRules(schema),
					keymap(buildKeymap(schema)),
					keymap(baseKeymap),
					dropCursor(),
					gapCursor(),
					menuBar({
						floating: false,
						content: [
							[
								menuItems.head1,
								menuItems.toggleStrong,
								menuItems.toggleEm,
							],
							[
								menuItems.wrapBlockQuote,
								menuItems.toggleLink,
							],
							[
								menuItems.wrapBulletList,
								menuItems.wrapOrderedList,
							],
						],
					}),
					history(),
				],
			}),
			dispatchTransaction: transaction => {
				const newState = this.editor!.state.apply(transaction);
				this.editor!.updateState(newState);

				this.dispatchEvent(
					new CustomEvent('mwc-markdown-editor-input', {
						detail: {
							value: defaultMarkdownSerializer.serialize(
								newState.doc
							),
						},
					})
				);
			},
			handleDOMEvents: {
				focus: () => {
					this.focused = true;
					return false;
				},
				blur: () => {
					this.focused = false;
					return false;
				},
			},
		});
		this.editor.focus();
	}

	protected updated(changedProperties: Map<string, any>) {
		if (changedProperties.has('disabled') && this.editor) {
			this.editor.updateState(this.editor.state);
		}
	}

	private promptValue() {
		this.promptDialogEl!.show();
		return new Promise<string>(resolve => {
			this.promptResolve = resolve;
		});
	}

	private onPromptSave(e: CustomEvent) {
		if (!this.promptResolve) {
			throw new Error(`Invalid state: prompt resolves wasn't initialized`);
		}

		const { value } = e.detail;
		this.promptResolve(value);
	}

	private onPromptCancel() {
		if (!this.promptResolve) {
			throw new Error(`Invalid state: prompt resolves wasn't initialized`);
		}

		this.promptResolve(undefined);
	}
}
