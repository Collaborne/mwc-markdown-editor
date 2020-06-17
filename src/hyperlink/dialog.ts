import { css, html, LitElement, property, query, customElement } from 'lit-element';

import '@material/mwc-button';
import '@material/mwc-dialog';
import { Dialog } from '@material/mwc-dialog';

import '@material/mwc-textfield';
import { TextField } from '@material/mwc-textfield';

export interface HyperlinkDialogSaveResponse {
	text: string;
	href: string;
}

@customElement('hyperlink-dialog')
export class HyperlinkDialog extends LitElement {
	@property({ type: String })
	public saveAction?: string;

	@property({ type: String })
	public textPlaceholder?: string;

	@property({ type: String })
	private text?: string;

	@property({ type: String })
	private href?: string;

	@query('#dialog')
	private dialogEl?: Dialog;

	@query('#text')
	private textEl?: TextField;

	@query('#href')
	private hrefEl?: TextField;

	static get styles() {
		return css`
			#dialog {
				--mdc-dialog-min-width: 350px;
			}

			mwc-textfield {
				display: block;
			}

			#href {
				margin-bottom: 16px;
			}

			mwc-button {
				--mdc-theme-primary: var(--markdown-editor-prompt-dialog-button-primary-color);
			}
		`;
	}

	public show(text: string, href: string = '') {
		if (this.dialogEl) {
			this.text = text;
			this.href = href;
			this.dialogEl.show();
		}
	}

	protected render() {
		// Only show text if it's different from href
		const text = this.href !== this.text ? this.text || '' : '';

		return html`
			<mwc-dialog id="dialog" @closed="${this.onClosed}">
				<mwc-textfield
					id="href"
					.value="${this.href || ''}"
					placeholder="https://"
					dialogInitialFocus
					outlined
				></mwc-textfield>
				<mwc-textfield
					id="text"
					.value="${text}"
					placeholder="${this.textPlaceholder}"
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
		this.href = this.hrefEl!.value;
		// Only store text if it's changed
		this.text = this.textEl!.value.length > 0 ? this.textEl!.value : this.href;

		const { action } = e.detail;
		if (action === 'save') {
			const detail: HyperlinkDialogSaveResponse = {
				href: this.href,
				text: this.text,
			};
			this.dispatchEvent(new CustomEvent('save', {
				detail,
			}));
		} else {
			this.dispatchEvent(new Event('cancel'));
		}
	}
}