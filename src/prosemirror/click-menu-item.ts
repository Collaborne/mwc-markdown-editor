import { Schema } from 'prosemirror-model';
import { MenuItem } from 'prosemirror-menu';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

const prefix = 'ProseMirror-menu';

// Work around classList.toggle being broken in IE11
function setClass(dom: HTMLElement, cls: string, on: boolean) {
	if (on) {
		dom.classList.add(cls);
	} else {
		dom.classList.remove(cls);
	}
}

function getIcon(dom: HTMLElement) {
	const node = document.createElement('div');
	node.className = 'ProseMirror-icon';
	node.appendChild(dom.cloneNode(true));
	return node;
}

/**
 * Menu item that triggers run on @click instead of @mousedown
 *
 * @see https://discuss.prosemirror.net/t/why-are-menu-functions-executed-on-mousedown/2923
 */
export class ClickMenuItem<S extends Schema> extends MenuItem<S> {
	public render(view: EditorView<S>) {
		const spec = this.spec;
		const dom = spec.icon && getIcon(spec.icon.dom);
		if (!dom) {
			throw new RangeError('MenuItem without icon or label property');
		}
		if (spec.title && typeof spec.title === 'string') {
			dom.setAttribute('title', spec.title);
		}
	
		dom.addEventListener('click', (e: Event) => {
			e.preventDefault();
			if (!dom.classList.contains(`${prefix}-disabled`)) {
				spec.run(view.state, view.dispatch, view, e);
			}
		})
	
		function update(state: EditorState<S>) {
			if (spec.select) {
				const selected = spec.select(state);
				dom!.style.display = selected ? '' : 'none';
				if (!selected) {
					return false;
				}
			}
			let enabled = true;
			if (spec.enable) {
				enabled = spec.enable(state) || false;
				setClass(dom!, `${prefix}-disabled`, !enabled);
			}
			if (spec.active) {
				const active = enabled && spec.active(state) || false;
				setClass(dom!, `${prefix}-active`, active);
			}
			return true;
		}
	
		return {
			dom,
			update,
		};
	}
}
