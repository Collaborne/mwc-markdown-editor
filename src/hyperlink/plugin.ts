import { Node as ProseNode, Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { HyperlinkDialogSaveResponse } from './dialog';
import { HyperlinkMarkView } from './view';
import { updateLink } from './commands';

export type PromptHyperlink = (text: string, href?: string) => Promise<HyperlinkDialogSaveResponse | undefined>;
export class HyperlinkPlugin<S extends Schema> extends Plugin<any, S> {
	constructor(private promptHyperlink: PromptHyperlink) {
		super({
			props: {
				nodeViews: {
					link: (node, view) => new HyperlinkMarkView(node, view, (pos: number) => this.onLinkClicked(node, view, pos)),
				},
			}
		});
	}

	private async onLinkClicked(node: ProseNode<S>, view: EditorView<S>, pos: number) {
		const currentNode: ProseNode | null | undefined = view.state.doc.nodeAt(pos)!;

		const response = await this.promptHyperlink(currentNode.text!, node.attrs.href) || '';
		// Only update if the user entered a new value
		if (response) {
			updateLink<S>({
				href: response.href,
				text: response.text!,
				pos,
			})(view.state, view.dispatch);
		}
	}
}
