import { defineTransformer, type ParsedContentFile } from '@nuxt/content';

export default defineTransformer({
	name: 'seo-draft',
	extensions: ['.md'],
	transform(file: ParsedContentFile) {
		if (file.draft === true) {
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
