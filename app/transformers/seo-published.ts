import { defineTransformer, type ParsedContentFile } from '@nuxt/content';

export default defineTransformer({
	name: 'seo-published',
	extensions: ['.md'],
	transform(file: ParsedContentFile) {
		if (file.draft === true || file.draft === undefined) {
			const result = {
				...file,
				robots: false,
				sitemap: false,
			};

			return result;
		}

		return file;
	},
});
