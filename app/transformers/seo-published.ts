import { defineTransformer, type ParsedContentFile } from '@nuxt/content';

export default defineTransformer({
	name: 'seo-published',
	extensions: ['.md'],
	transform(file: ParsedContentFile) {
		if (file.published === false || file.published === undefined) {
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
