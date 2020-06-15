import { html, fixture, expect } from '@open-wc/testing';

import { MarkdownEditor } from '../src/mwc-markdown-editor';
import '../mwc-markdown-editor';

describe('MarkdownEditor', () => {
	it('sets the value via attribute', async () => {
		const el: MarkdownEditor = await fixture(html`
			<mwc-markdown-editor value="My value"></mwc-markdown-editor>
		`);

		expect(el.value).to.equal('My value');
	});

	it('passes the a11y audit', async () => {
		const el: MarkdownEditor = await fixture(html`
			<mwc-markdown-editor></mwc-markdown-editor>
		`);

		await expect(el).shadowDom.to.be.accessible({
			ignoredRules: ['color-contrast'],
		});
	});
});
