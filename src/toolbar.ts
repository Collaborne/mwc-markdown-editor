import { css, html, LitElement, property, query, customElement } from 'lit-element';

import '@material/mwc-menu';

import '@material/mwc-textfield';
import { TextField } from '@material/mwc-textfield';

export interface HyperlinkToolbarSaveResponse {
	text: string;
	href?: string;
}

const HREF_PLACEHOLDER = 'https://';

@customElement('hyperlink-toolbar')
export class HyperlinkToolbar extends LitElement {
	@property({ type: String })
	public textPlaceholder?: string;

	@property({ type: Boolean })
	public hideText: boolean = false;

	@property({ type: String })
	public text?: string;

	@property({ type: String })
	public href?: string;

	@property({ type: Boolean })
	public open: boolean = false;

	@property({ type: Number })
	public x: number = 0;

	@property({ type: Number })
	public y: number = 0;

	@property({ type: Object })
	public anchor?: HTMLElement;

	@query('#text')
	private textEl?: TextField;

	@query('#href')
	private hrefEl?: TextField;

	static get styles() {
		return css`
			:host {
				--mdc-menu-min-width: 350px;
				--mdc-list-vertical-padding: 0;
			}

			mwc-textfield {
				display: block;
				margin: 16px;
			}

			[hidden] {
				display: none!important;
			}
		`;
	}

	protected render() {
		// Only show text if it's different from href
		const text = this.href !== this.text ? this.text || '' : '';

		return html`
			<mwc-menu
				.open="${this.open}"
				.anchor="${this.anchor}"
				.x="${this.x}"
				.y="${this.y}"
				@opened="${this.onOpened}"
				@closed="${this.onClosed}">
				<mwc-textfield
					id="href"
					.value="${this.href || HREF_PLACEHOLDER}"
					placeholder="${HREF_PLACEHOLDER}"
					outlined
				></mwc-textfield>
				<mwc-textfield
					id="text"
					.value="${text}"
					placeholder="${this.textPlaceholder}"
					outlined
					?hidden="${this.hideText}"
				></mwc-textfield>
			</mwc-menu>
		`;
	}

	private onOpened() {
		this.hrefEl!.focus();
	}

	private onClosed() {
		this.open = false;
		this.href = this.hrefEl!.value !== HREF_PLACEHOLDER ? this.hrefEl!.value : undefined;
		this.text = this.textEl!.value || this.href || '';

		const detail: HyperlinkToolbarSaveResponse = {
			href: this.href,
			text: this.text,
		};
		this.dispatchEvent(new CustomEvent('save', {
			detail,
		}));
	}
}
