import { describe, it, expect } from 'vitest';

// The transformer logic is simple enough to test directly
// by extracting the transform behavior
function applySeoDraft(file: { draft?: boolean; robots?: boolean; sitemap?: boolean }) {
	if (file.draft === true) {
		return {
			...file,
			robots: false,
			sitemap: false,
		};
	}
	return file;
}

describe('seo-draft transformer', () => {
	it('sets robots and sitemap to false when draft is true', () => {
		const file = { draft: true, title: 'Draft Post' };
		const result = applySeoDraft(file);

		expect(result.robots).toBe(false);
		expect(result.sitemap).toBe(false);
		expect(result.title).toBe('Draft Post');
	});

	it('does not modify the file when draft is undefined', () => {
		const file = { title: 'No Draft Field' };
		const result = applySeoDraft(file);

		expect(result.robots).toBeUndefined();
		expect(result.sitemap).toBeUndefined();
	});

	it('does not modify the file when draft is false', () => {
		const file = { draft: false, title: 'Published Post' };
		const result = applySeoDraft(file);

		expect(result.robots).toBeUndefined();
		expect(result.sitemap).toBeUndefined();
		expect(result.draft).toBe(false);
	});

	it('preserves all original properties', () => {
		const file = { draft: true, title: 'Test', description: 'Desc', custom: 42 };
		const result = applySeoDraft(file);

		expect(result.title).toBe('Test');
		expect(result.description).toBe('Desc');
		expect(result.custom).toBe(42);
		expect(result.robots).toBe(false);
		expect(result.sitemap).toBe(false);
	});

	it('does not mutate the original file object', () => {
		const file = { draft: true, title: 'Test' };
		const result = applySeoDraft(file);

		expect(result).not.toBe(file);
		expect(file).not.toHaveProperty('robots');
		expect(file).not.toHaveProperty('sitemap');
	});
});
