import { Mark, Node as ProseNode, ResolvedPos, Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';

type Dispatch<S extends Schema> = (tr: Transaction<S>) => void;
interface Options {
	href: string;
	text: string;
	pos: number;
	to?: number;
}
export function updateLink<S extends Schema>(options: Options) {
	return (state: EditorState<S>, dispatch: Dispatch<S>) => {
		const $pos: ResolvedPos = state.doc.resolve(options.pos);
		const node: ProseNode | null | undefined = state.doc.nodeAt(options.pos);
		if (!node) {
			return false;
		}

		const currentMark = state.schema.marks.link.isInSet(node.marks);
		const linkMark = state.schema.marks.link;

		const rightBound = options.to && options.pos !== options.to ? options.to : options.pos - $pos.textOffset + node.nodeSize;
		const tr = state.tr;
		tr.insertText(options.text, options.pos, rightBound);
		const linkAttrs = {
			...((currentMark && currentMark.attrs) || {}),
			href: options.href,
			title: options.href,
		};
		const mark = linkMark.create(linkAttrs) as Mark<S>;
		tr.addMark(options.pos, options.pos + options.text.length, mark);
		if (dispatch) {
			dispatch(tr);
		}
		return true;
	};
}
