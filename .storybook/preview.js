import { addParameters, setCustomElements } from '@open-wc/demoing-storybook';
import CUSTOM_ELEMENTS from '../custom-elements.json';

addParameters({
	docs: {
		iframeHeight: '200px',
	},
});

async function run() {
	setCustomElements(CUSTOM_ELEMENTS);
}

run();
