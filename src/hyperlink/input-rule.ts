/**
 * Inspired by https://discuss.prosemirror.net/t/autolinker/1103/5
 */

import { InputRule } from 'prosemirror-inputrules';
import { MarkType, Schema } from 'prosemirror-model';

function markInputRule<S extends Schema>(regexp: RegExp, markType: MarkType<S>, getAttrs: Function) {
	return new InputRule(regexp, (state, match, start, end) => {
		const $start = state.doc.resolve(start);
		const attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
		if (!$start.parent.type.allowsMarkType(markType)) {
			return null;
		}
		const oLinkString = match[0].substring(0, match[0].length - 1);
		const oAttr = attrs.type == 'email' ?
			{
				href: `mailto:${oLinkString}`,
			} :
			{
				href: oLinkString,
				target: '_blank',
			};
		const oLink = markType.create(oAttr);
		const oPos = {
			from: start,
			to: end,
		};
		const tr = state.tr
			.removeMark(oPos.from, oPos.to, markType)
			.addMark(oPos.from, oPos.to, oLink)
			.insertText(' ');
		return tr;
	});
}

export function linkRule<S extends Schema>(markType: MarkType<S>) {
	return markInputRule(
		// eslint-disable-next-line no-useless-escape
		/(?:(?:(https|http|ftp)+):\/\/)?(?:\S+(?::\S*)?(@))?(?:(?:([a-z0-9][a-z0-9\-]*)?[a-z0-9]+)(?:\.(?:[a-z0-9\-])*[a-z0-9]+)*(?:\.(?:[a-z]{2,})(:\d{1,5})?))(?:\/[^\s]*)?\s$/i,
		markType,
		(match: string[]) => ({
			type: match[2] == '@' ? 'email' : 'uri',
		})
	);
}
