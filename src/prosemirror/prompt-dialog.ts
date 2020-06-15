import { css, html, LitElement, property, query, customElement } from 'lit-element';

import '@material/mwc-button';
import '@material/mwc-dialog';
import { Dialog } from '@material/mwc-dialog';

import '@material/mwc-textfield';
import { TextField } from '@material/mwc-textfield';

@customElement('prompt-dialog')
export class PromptDialog extends LitElement {
	@property({ type: String })
	public saveAction?: string;

	@query('#dialog')
	private dialogEl?: Dialog;

	@query('#value')
	private valueEl?: TextField;

	static get styles() {
		return css`
			#dialog {
				--mdc-dialog-min-width: 350px;
			}

			#value {
				width: 100%;
			}

			mwc-button {
				--mdc-theme-primary: var(--mwc-markdown-editor-prompt-dialog-button-primary-color);
			}
		`;
	}

	public show() {
		if (this.dialogEl) {
			this.valueEl!.value = '';
			this.dialogEl.show();
		}
	}

	protected render() {
		return html`
			<mwc-dialog id="dialog" @closed="${this.onClosed}">
				<mwc-textfield
					id="value"
					placeholder="https://"
					dialogInitialFocus
					outlined
				></mwc-textfield>
				<mwc-button
					slot="primaryAction"
					unelevated
					dialogAction="save"
				>${this.saveAction}</mwc-button>
			</mwc-dialog>
		`;
	}

	private onClosed(e: CustomEvent) {
		const { action } = e.detail;
		if (action === 'save') {
			this.dispatchEvent(new CustomEvent('save', {
				detail: {
					value: this.valueEl!.value,
				},
			}));
		} else {
			this.dispatchEvent(new Event('cancel'));
		}
	}
}
