import { linkRule } from 'prosemirror-hyperlink';
import { inputRules, wrappingInputRule, textblockTypeInputRule, smartQuotes, emDash, ellipsis } from 'prosemirror-inputrules';
import { NodeType, Schema } from 'prosemirror-model';

export function blockQuoteRule<S extends Schema>(nodeType: NodeType<S>) {
	return wrappingInputRule(/^\s*>\s$/, nodeType);
}

export function orderedListRule<S extends Schema>(nodeType: NodeType<S>) {
	return wrappingInputRule(
		/^(\d+)\.\s$/,
		nodeType,
		match => ({
			order: +match[1],
		}),
		(match, node) => node.childCount + node.attrs.order == +match[1]
	);
}

export function bulletListRule<S extends Schema>(nodeType: NodeType<S>) {
	return wrappingInputRule(/^\s*([-+*])\s$/, nodeType);
}

export function headingRule<S extends Schema>(nodeType: NodeType<S>, maxLevel: number) {
	return textblockTypeInputRule(
		new RegExp('^(#{1,' + maxLevel + '})\\s$'),
		nodeType,
		match => ({
			level: match[1].length,
		})
	);
}

export function buildInputRules<S extends Schema>(schema: S) {
	const rules = [
		...smartQuotes,
		ellipsis,
		emDash,
		linkRule(schema.marks.link),
	];
	if (schema.nodes.blockquote) {
		rules.push(blockQuoteRule(schema.nodes.blockquote));
	}
	if (schema.nodes.ordered_list) {
		rules.push(orderedListRule(schema.nodes.ordered_list));
	}
	if (schema.nodes.bullet_list) {
		rules.push(bulletListRule(schema.nodes.bullet_list));
	}
	if (schema.nodes.heading) {
		rules.push(headingRule(schema.nodes.heading, 6));
	}

	return inputRules({ rules });
}
