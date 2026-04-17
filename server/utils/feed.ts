import { Feed } from 'feed';

export interface FeedConfig {
	title: string;
	description: string;
	feedPath: string;
	homePath: string;
}

export interface FeedItemData {
	id: string;
	path: string;
	title: string;
	description: string;
	date_published: Date;
	date_modified: Date;
	image?: string;
	tags?: string[];
}

export interface FeedAuthor {
	name: string;
	link: string;
	avatar: string;
}

/**
 * Creates a Feed instance with the given configuration
 */
export function createFeed(config: FeedConfig, siteUrl: string, author: FeedAuthor): Feed {
	const homeUrl = new URL(config.homePath, siteUrl).toString();
	const feedBaseUrl = new URL(config.feedPath, siteUrl).toString();

	return new Feed({
		title: config.title,
		description: config.description,
		id: homeUrl,
		link: homeUrl,
		language: 'en-US',
		image: new URL('/images/asher-face.jpg', siteUrl).toString(),
		favicon: new URL('/favicon.ico', siteUrl).toString(),
		copyright: `Copyright © ${new Date().getFullYear()} ${author.name}`,
		feedLinks: {
			json: `${feedBaseUrl}.json`,
			rss: `${feedBaseUrl}.xml`,
			atom: `${feedBaseUrl}.atom`,
		},
		author: {
			name: author.name,
			link: author.link,
		},
	});
}

/**
 * Adds an item to a Feed instance
 */
export function addFeedItem(feed: Feed, item: FeedItemData, siteUrl: string, author: FeedAuthor): void {
	const itemUrl = new URL(item.path, siteUrl).toString();

	feed.addItem({
		id: item.id,
		link: itemUrl,
		title: item.title,
		description: item.description,
		date: item.date_published,
		published: item.date_published,
		image: item.image,
		author: [
			{
				name: author.name,
				link: author.link,
			},
		],
		category: item.tags?.map(tag => ({ name: tag })),
	});
}

/**
 * Returns the appropriate feed response based on format
 */
export function getFeedResponse(feed: Feed, format: 'json' | 'xml' | 'atom'): { content: string; contentType: string } {
	switch (format) {
		case 'json':
			return {
				content: feed.json1(),
				contentType: 'application/feed+json',
			};
		case 'xml':
			return {
				content: feed.rss2(),
				contentType: 'application/rss+xml',
			};
		case 'atom':
			return {
				content: feed.atom1(),
				contentType: 'application/atom+xml',
			};
	}
}

/**
 * Parses a feed format from a file extension
 */
export function parseFeedFormat(slug: string): { format: 'json' | 'xml' | 'atom' } | null {
	if (slug.endsWith('.json')) {
		return { format: 'json' };
	}
	if (slug.endsWith('.xml')) {
		return { format: 'xml' };
	}
	if (slug.endsWith('.atom')) {
		return { format: 'atom' };
	}
	return null;
}

/**
 * Default author configuration
 */
export function getDefaultAuthor(siteUrl: string): FeedAuthor {
	return {
		name: 'Asher Norland',
		link: new URL('/contact', siteUrl).toString(),
		avatar: new URL('/images/asher-face.jpg', siteUrl).toString(),
	};
}

/**
 * Extract image from different content types
 */
export function getItemImage(page: unknown, siteUrl?: string): string | undefined {
	const p = page as Record<string, unknown>;

	// Reviews have a top-level poster_path (prefixed with 'tmdb' at build time)
	if (typeof p.poster_path === 'string' && p.poster_path.startsWith('tmdb')) {
		return `https://image.tmdb.org/t/p/w500${p.poster_path.slice(4)}`;
	}

	// Photography has images array
	if (Array.isArray(p.images) && p.images.length > 0) {
		const firstImage = p.images[0] as Record<string, unknown>;
		if (firstImage.src) {
			const src = String(firstImage.src);
			if (siteUrl && src.startsWith('/')) {
				return new URL(src, siteUrl).toString();
			}
			return src;
		}
	}

	return undefined;
}

/**
 * Extract tags from different content types
 */
export function getItemTags(page: unknown): string[] | undefined {
	const p = page as Record<string, unknown>;

	// Reviews have genres in tmdbData
	if (p.tmdbData && typeof p.tmdbData === 'object') {
		const tmdb = p.tmdbData as Record<string, unknown>;
		if (Array.isArray(tmdb.genres)) {
			return tmdb.genres.map((g: { name: string }) => g.name);
		}
	}

	// Jobs have tags
	if (Array.isArray(p.tags)) {
		return p.tags as string[];
	}

	return undefined;
}
