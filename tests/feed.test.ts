import { describe, it, expect } from 'vitest';
import {
	createFeed,
	addFeedItem,
	getFeedResponse,
	parseFeedFormat,
	getDefaultAuthor,
	getItemImage,
	type FeedConfig,
	type FeedItemData,
} from '../server/utils/feed';

const TEST_SITE_URL = 'https://example.com';
const TEST_AUTHOR = getDefaultAuthor(TEST_SITE_URL);
const TEST_CONFIG: FeedConfig = {
	title: 'Test Blog',
	description: 'A test blog feed',
	feedPath: '/feed/blog',
	homePath: '/blog',
};

function createTestFeed(config = TEST_CONFIG) {
	return createFeed(config, TEST_SITE_URL, TEST_AUTHOR);
}

function createTestItem(overrides: Partial<FeedItemData> = {}): FeedItemData {
	return {
		id: 'post-1',
		path: '/blog/my-post',
		title: 'My First Post',
		description: 'This is my first blog post',
		date_published: new Date('2024-01-15'),
		date_modified: new Date('2024-01-16'),
		...overrides,
	};
}

describe('feed utilities', () => {
	describe('parseFeedFormat', () => {
		it.each([
			['feed.json', 'json'],
			['feed.xml', 'xml'],
			['feed.atom', 'atom'],
		])('parses %s as %s', (input, format) => {
			expect(parseFeedFormat(input)).toEqual({ format });
		});

		it('returns null for invalid formats', () => {
			expect(parseFeedFormat('feed.txt')).toBeNull();
			expect(parseFeedFormat('feed')).toBeNull();
			expect(parseFeedFormat('')).toBeNull();
		});
	});

	describe('getDefaultAuthor', () => {
		it('returns author with correct URLs', () => {
			expect(TEST_AUTHOR).toMatchObject({
				name: 'Asher Norland',
				link: 'https://example.com/contact',
				avatar: 'https://example.com/images/asher-face.jpg',
			});
		});
	});

	describe('createFeed', () => {
		it('creates a feed with correct metadata', () => {
			const json = JSON.parse(createTestFeed().json1());

			expect(json.title).toBe('Test Blog');
			expect(json.description).toBe('A test blog feed');
			expect(json.home_page_url).toBe('https://example.com/blog');
			expect(json.feed_url).toBe('https://example.com/feed/blog.json');
			expect(json.author.name).toBe('Asher Norland');
		});
	});

	describe('addFeedItem', () => {
		it('adds an item with tags and image', () => {
			const feed = createTestFeed();
			addFeedItem(feed, createTestItem({
				tags: ['javascript', 'testing'],
				image: 'https://example.com/images/photo.jpg',
			}), TEST_SITE_URL, TEST_AUTHOR);

			const json = JSON.parse(feed.json1());
			expect(json.items).toHaveLength(1);
			expect(json.items[0].url).toBe('https://example.com/blog/my-post');
			expect(json.items[0].tags).toEqual(['javascript', 'testing']);
			expect(json.items[0].image).toBe('https://example.com/images/photo.jpg');
		});

		it('handles items without optional fields', () => {
			const feed = createTestFeed();
			addFeedItem(feed, createTestItem(), TEST_SITE_URL, TEST_AUTHOR);

			const json = JSON.parse(feed.json1());
			expect(json.items).toHaveLength(1);
			expect(json.items[0].title).toBe('My First Post');
		});
	});

	describe('getFeedResponse', () => {
		it.each([
			['json', 'application/feed+json', '"version"'],
			['xml', 'application/rss+xml', '<rss'],
			['atom', 'application/atom+xml', '<feed'],
		] as const)('returns %s feed with correct content type', (format, contentType, marker) => {
			const response = getFeedResponse(createTestFeed(), format);
			expect(response.contentType).toBe(contentType);
			expect(response.content).toContain(marker);
		});
	});

	describe('getItemImage', () => {
		it('returns TMDB poster URL for review items', () => {
			expect(getItemImage({ poster_path: 'tmdb/abc.jpg' }))
				.toBe('https://image.tmdb.org/t/p/w500/abc.jpg');
		});

		it('resolves relative image path to absolute URL with siteUrl', () => {
			const page = { images: [{ src: '/images/mold/Mold.png' }] };
			expect(getItemImage(page)).toBe('/images/mold/Mold.png');
			expect(getItemImage(page, TEST_SITE_URL)).toBe('https://example.com/images/mold/Mold.png');
		});

		it('returns undefined when no image data exists', () => {
			expect(getItemImage({})).toBeUndefined();
		});
	});

	describe('photography feed RSS/Atom with resolved images', () => {
		it('generates valid RSS/Atom without throwing on image URLs', () => {
			const feed = createTestFeed({
				title: 'Photography',
				description: 'Photography feed',
				feedPath: '/feed/photography',
				homePath: '/photography',
			});

			addFeedItem(feed, createTestItem({
				id: 'photo-1',
				path: '/photography/mold-i',
				title: 'Mold I',
				image: getItemImage({ images: [{ src: '/images/mold/Mold.png' }] }, TEST_SITE_URL),
			}), TEST_SITE_URL, TEST_AUTHOR);

			expect(() => getFeedResponse(feed, 'xml')).not.toThrow();
			expect(() => getFeedResponse(feed, 'atom')).not.toThrow();
			expect(getFeedResponse(feed, 'xml').content).toContain('https://example.com/images/mold/Mold.png');
		});
	});
});
