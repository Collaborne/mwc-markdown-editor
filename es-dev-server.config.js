const cjsTransformer = require('es-dev-commonjs-transformer');
const json = require('es-dev-server-import-json');

module.exports = {
	plugins: [
		json(),
	],
	responseTransformers: [
		cjsTransformer([
			'**/node_modules/@open-wc/**/*',
		]),
	],
};
