import { blockTypeItem, wrapItem, MenuItem, MenuItemSpec } from 'prosemirror-menu';
import { toggleMark } from 'prosemirror-commands';
import { MarkType, NodeType, Schema } from 'prosemirror-model';
import { wrapInList } from 'prosemirror-schema-list';
import { EditorState, Transaction } from 'prosemirror-state';

interface MarkItemIcon {
	dom: HTMLElement;
}
interface MarkItemOption {
	title: string;
	icon: MarkItemIcon;
}

type Cmd<S extends Schema> = (state: EditorState<S>, dispatch?: (tr: Transaction<S>) => void) => boolean;

function createIcon(icon: string): MarkItemIcon {
	const iconEl = document.createElement('mwc-icon');
	iconEl.textContent = icon;
	return {
		dom: iconEl,
	};
}

function cmdItem<S extends Schema>(cmd: Cmd<S>, options: { [key: string]: any }) {
	const passedOptions: MenuItemSpec<S> = {
		...options,
		label: options.title,
		run: cmd,
	};
	if ((!options.enable || options.enable === true) && !options.select) {
		passedOptions[options.enable ? 'enable' : 'select'] = state => cmd(state);
	}

	return new MenuItem(passedOptions);
}

function markActive<S extends Schema>(state: EditorState<S>, type: MarkType<S>): boolean {
	const { from, $from, to, empty } = state.selection;
	if (empty) {
		return Boolean(type.isInSet(state.storedMarks || $from.marks()));
	} else {
		return state.doc.rangeHasMark(from, to, type);
	}
}

function markItem<S extends Schema>(markType: MarkType<S>, options: MarkItemOption) {
	const passedOptions = {
		...options,
		active(state: EditorState<S>) {
			return markActive(state, markType);
		},
		enable: true,
	};
	return cmdItem(toggleMark(markType), passedOptions);
}

function linkItem<S extends Schema>(markType: MarkType<S>, promptValue: PromptValue) {
	return new MenuItem({
		title: 'Add or remove link',
		icon: createIcon('insert_link'),
		active(state: EditorState<S>) {
			return markActive(state, markType);
		},
		enable(state) {
			return !state.selection.empty;
		},
		async run(state, dispatch, view) {
			if (markActive(state, markType)) {
				toggleMark(markType)(state, dispatch);
				return true;
			}
			const href = await promptValue();
			toggleMark(markType, { href })(view.state, view.dispatch);
			view.focus();
		},
	});
}

function wrapListItem<S extends Schema>(nodeType: NodeType<S>, options: { [key: string]: any }) {
	return cmdItem(wrapInList(nodeType, options.attrs), options);
}

type PromptValue = () => Promise<string | undefined>;
export function buildMenuItems<S extends Schema>(schema: S, promptValue: PromptValue): { [key: string]: MenuItem } {
	const result: { [key: string]: MenuItem } = {};
	if (schema.marks.strong) {
		result.toggleStrong = markItem(schema.marks.strong, {
			title: 'Toggle strong style',
			icon: createIcon('format_bold'),
		});
	}
	if (schema.marks.em) {
		result.toggleEm = markItem(schema.marks.em, {
			title: 'Toggle emphasis',
			icon: createIcon('format_italic'),
		});
	}
	if (schema.marks.link) {
		result.toggleLink = linkItem(schema.marks.link, promptValue);
	}

	if (schema.nodes.heading) {
		result.head1 = blockTypeItem(schema.nodes.heading, {
			title: 'Change to title',
			icon: createIcon('title'),
			label: `Title`,
			attrs: { level: 1 },
		});
	}

	if (schema.nodes.bullet_list) {
		result.wrapBulletList = wrapListItem(schema.nodes.bullet_list, {
			title: 'Wrap in bullet list',
			icon: createIcon('format_list_bulleted'),
		});
	}
	if (schema.nodes.ordered_list) {
		result.wrapOrderedList = wrapListItem(schema.nodes.ordered_list, {
			title: 'Wrap in ordered list',
			icon: createIcon('format_list_numbered'),
		});
	}
	if (schema.nodes.blockquote) {
		result.wrapBlockQuote = wrapItem(schema.nodes.blockquote, {
			title: 'Wrap in block quote',
			icon: createIcon('format_quote'),
		});
	}

	return result;
}
