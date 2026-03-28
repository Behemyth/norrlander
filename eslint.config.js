import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
	ignores: ['content/**/*.md', 'README.md'],
}).overrideRules({
	'vue/multi-word-component-names': 'off',
	'@typescript-eslint/no-explicit-any': 'off',
});
