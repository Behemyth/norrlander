import type { FeedConfig } from '../../utils/feed';

type FeedableCollections = 'blog' | 'photography' | 'movie' | 'show';

const feedConfigs: Record<string, { collection: FeedableCollections; config: FeedConfig }> = {
	'blog': {
		collection: 'blog',
		config: {
			title: 'Blog',
			description: 'A collection of my blog posts and articles.',
			feedPath: '/feed/blog',
			homePath: '/blog',
		},
	},
	'photography': {
		collection: 'photography',
		config: {
			title: 'Photography',
			description: 'A collection of my photography work.',
			feedPath: '/feed/photography',
			homePath: '/photography',
		},
	},
	'review/movie': {
		collection: 'movie',
		config: {
			title: 'Movie Reviews',
			description: 'A collection of my movie reviews.',
			feedPath: '/feed/review/movie',
			homePath: '/review/movie',
		},
	},
	'review/show': {
		collection: 'show',
		config: {
			title: 'Show Reviews',
			description: 'A collection of my TV show reviews.',
			feedPath: '/feed/review/show',
			homePath: '/review/show',
		},
	},
};

export default defineEventHandler(async (event) => {
	const { queryCollection } = await import('@nuxt/content/server');

	const slugParts = getRouterParam(event, 'slug');
	if (!slugParts) {
		throw createError({ status: 404, message: 'Feed not found' });
	}

	// Parse format extension from last segment (e.g. "blog.json" → "blog" + ".json")
	const parsed = parseFeedFormat(slugParts);
	if (!parsed) {
		throw createError({ status: 404, message: 'Invalid feed format. Use .json, .xml, or .atom' });
	}

	const { format } = parsed;
	// Strip the extension to get the feed key (e.g. "blog.json" → "blog", "review/movie.xml" → "review/movie")
	const feedKey = slugParts.replace(/\.(json|xml|atom)$/, '');

	const feedEntry = feedConfigs[feedKey];
	if (!feedEntry) {
		throw createError({ status: 404, message: 'Feed not found' });
	}

	const siteUrl = getSiteConfig(event).url;
	const author = getDefaultAuthor(siteUrl);
	const feed = createFeed(feedEntry.config, siteUrl, author);

	const data = await queryCollection(event, feedEntry.collection)
		.where('draft', '=', false)
		.order('date_published', 'DESC')
		.all();

	for (const page of data) {
		const p = page as unknown as {
			id: string;
			path?: string;
			title: string;
			description?: string;
			date_published: Date | string;
			date_modified: Date | string;
		};

		const itemData = {
			id: p.id,
			path: p.path ?? '/',
			title: p.title,
			description: p.description ?? '',
			date_published: new Date(p.date_published),
			date_modified: new Date(p.date_modified),
			image: getItemImage(page),
			tags: getItemTags(page),
		};

		addFeedItem(feed, itemData, siteUrl, author);
	}

	const response = getFeedResponse(feed, format);
	setResponseHeader(event, 'content-type', response.contentType);
	setResponseHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=3600');

	return response.content;
});
