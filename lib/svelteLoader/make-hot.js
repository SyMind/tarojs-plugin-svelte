const { walk } = require('svelte/compiler');
const { createMakeHot } = require('svelte-hmr');

const hotApi = require.resolve('./hot-api');

const buildMakeHot = (hotOptions) => createMakeHot({
	walk,
	meta: 'module',
	hotApi,
	hotOptions
});

module.exports.buildMakeHot = buildMakeHot;
