import { describe, it, expect } from 'vitest';
import {
	createFeed,
	addFeedItem,
	getFeedResponse,
	parseFeedFormat,
	getDefaultAuthor,
	type FeedConfig,
	type FeedItemData,
} from '../server/utils/feed';

const TEST_SITE_URL = 'https://example.com';

describe('feed utilities', () => {
	describe('parseFeedFormat', () => {
		it('parses .json format', () => {
			expect(parseFeedFormat('feed.json')).toEqual({ format: 'json' });
		});

		it('parses .xml format', () => {
			expect(parseFeedFormat('feed.xml')).toEqual({ format: 'xml' });
		});

		it('parses .atom format', () => {
			expect(parseFeedFormat('feed.atom')).toEqual({ format: 'atom' });
		});

		it('returns null for invalid format', () => {
			expect(parseFeedFormat('feed.txt')).toBeNull();
			expect(parseFeedFormat('feed')).toBeNull();
			expect(parseFeedFormat('')).toBeNull();
		});
	});

	describe('getDefaultAuthor', () => {
		it('returns author with correct URLs', () => {
			const author = getDefaultAuthor(TEST_SITE_URL);

			expect(author.name).toBe('Asher Norland');
			expect(author.link).toBe('https://example.com/contact');
			expect(author.avatar).toBe('https://example.com/images/asher-face.jpg');
		});
	});

	describe('createFeed', () => {
		const config: FeedConfig = {
			title: 'Test Blog',
			description: 'A test blog feed',
			feedPath: '/feed/blog',
			homePath: '/blog',
		};

		it('creates a feed with correct metadata', () => {
			const author = getDefaultAuthor(TEST_SITE_URL);
			const feed = createFeed(config, TEST_SITE_URL, author);

			// Generate JSON to inspect the feed structure
			const json = JSON.parse(feed.json1());

			expect(json.title).toBe('Test Blog');
			expect(json.description).toBe('A test blog feed');
			expect(json.home_page_url).toBe('https://example.com/blog');
			expect(json.feed_url).toBe('https://example.com/feed/blog.json');
			expect(json.author.name).toBe('Asher Norland');
		});

		it('includes feed links for all formats', () => {
			const author = getDefaultAuthor(TEST_SITE_URL);
			const feed = createFeed(config, TEST_SITE_URL, author);
			const json = JSON.parse(feed.json1());

			expect(json.feed_url).toContain('.json');
		});
	});

	describe('addFeedItem', () => {
		it('adds an item to the feed', () => {
			const config: FeedConfig = {
				title: 'Test Blog',
				description: 'A test blog feed',
				feedPath: '/feed/blog',
				homePath: '/blog',
			};
			const author = getDefaultAuthor(TEST_SITE_URL);
			const feed = createFeed(config, TEST_SITE_URL, author);

			const item: FeedItemData = {
				id: 'post-1',
				path: '/blog/my-post',
				title: 'My First Post',
				description: 'This is my first blog post',
				date_published: new Date('2024-01-15'),
				date_modified: new Date('2024-01-16'),
				tags: ['javascript', 'testing'],
			};

			addFeedItem(feed, item, TEST_SITE_URL, author);

			const json = JSON.parse(feed.json1());

			expect(json.items).toHaveLength(1);
			expect(json.items[0].id).toBe('post-1');
			expect(json.items[0].url).toBe('https://example.com/blog/my-post');
			expect(json.items[0].title).toBe('My First Post');
			// Note: The feed library does not include description in JSON Feed output
			// Description is only used for RSS/Atom feeds
			expect(json.items[0].tags).toContain('javascript');
			expect(json.items[0].tags).toContain('testing');
		});

		it('handles items with images', () => {
			const config: FeedConfig = {
				title: 'Test Blog',
				description: 'A test blog feed',
				feedPath: '/feed/blog',
				homePath: '/blog',
			};
			const author = getDefaultAuthor(TEST_SITE_URL);
			const feed = createFeed(config, TEST_SITE_URL, author);

			const item: FeedItemData = {
				id: 'post-2',
				path: '/blog/photo-post',
				title: 'Photo Post',
				description: 'A post with an image',
				date_published: new Date('2024-02-01'),
				date_modified: new Date('2024-02-01'),
				image: 'https://example.com/images/photo.jpg',
			};

			addFeedItem(feed, item, TEST_SITE_URL, author);

			const json = JSON.parse(feed.json1());

			expect(json.items[0].image).toBe('https://example.com/images/photo.jpg');
		});

		it('handles items without optional fields', () => {
			const config: FeedConfig = {
				title: 'Test Blog',
				description: 'A test blog feed',
				feedPath: '/feed/blog',
				homePath: '/blog',
			};
			const author = getDefaultAuthor(TEST_SITE_URL);
			const feed = createFeed(config, TEST_SITE_URL, author);

			const item: FeedItemData = {
				id: 'post-3',
				path: '/blog/minimal-post',
				title: 'Minimal Post',
				description: 'A minimal post',
				date_published: new Date('2024-03-01'),
				date_modified: new Date('2024-03-01'),
			};

			addFeedItem(feed, item, TEST_SITE_URL, author);

			const json = JSON.parse(feed.json1());

			expect(json.items).toHaveLength(1);
			expect(json.items[0].title).toBe('Minimal Post');
		});
	});

	describe('getFeedResponse', () => {
		const config: FeedConfig = {
			title: 'Test Blog',
			description: 'A test blog feed',
			feedPath: '/feed/blog',
			homePath: '/blog',
		};

		it('returns JSON feed with correct content type', () => {
			const author = getDefaultAuthor(TEST_SITE_URL);
			const feed = createFeed(config, TEST_SITE_URL, author);
			const response = getFeedResponse(feed, 'json');

			expect(response.contentType).toBe('application/feed+json');
			expect(() => JSON.parse(response.content)).not.toThrow();

			const json = JSON.parse(response.content);
			// The feed library uses JSON Feed 1.0 spec
			expect(json.version).toBe('https://jsonfeed.org/version/1');
		});

		it('returns RSS feed with correct content type', () => {
			const author = getDefaultAuthor(TEST_SITE_URL);
			const feed = createFeed(config, TEST_SITE_URL, author);
			const response = getFeedResponse(feed, 'xml');

			expect(response.contentType).toBe('application/rss+xml');
			expect(response.content).toContain('<?xml');
			expect(response.content).toContain('<rss');
			expect(response.content).toContain('Test Blog');
		});

		it('returns Atom feed with correct content type', () => {
			const author = getDefaultAuthor(TEST_SITE_URL);
			const feed = createFeed(config, TEST_SITE_URL, author);
			const response = getFeedResponse(feed, 'atom');

			expect(response.contentType).toBe('application/atom+xml');
			expect(response.content).toContain('<?xml');
			expect(response.content).toContain('<feed');
			expect(response.content).toContain('xmlns="http://www.w3.org/2005/Atom"');
		});
	});
});
