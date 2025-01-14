import type { FileAfterParseHook } from '@nuxt/content';

// TODO: This feature is not implemented yet with Content v3
export default defineNitroPlugin((nitroApp) => {
	nitroApp.hooks.hook('content:file:afterParse', (ctx: FileAfterParseHook) => {
		console.log('content:file:afterParse', ctx);
		// TODO: This isn't being run
	});
});
