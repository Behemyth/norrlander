import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
}).overrideRules({
	'vue/multi-word-component-names': 'off',
	'@typescript-eslint/no-explicit-any': 'off',
});
