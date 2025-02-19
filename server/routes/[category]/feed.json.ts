import type { PageCollections } from '@nuxt/content';

export default defineEventHandler(async (event) => {
	const category = getRouterParam(event, 'category') as keyof PageCollections;

	const feedContent = await queryCollection(event, 'feed')
		.where('category', '=', category)
		.first();

	if (!feedContent) {
		throw createError({
			statusCode: 404,
			statusMessage:
				'Feed data not found',
		});
	}

	const author: JSONFeedAuthor = {
		name: 'Asher Norland',
		url: new URL('/contact', 'https://ashernorland.com').toString(),
		avatar: new URL('/avatar/293a56bef971ab4999d6230491957d33', 'https://www.gravatar.com').toString(),
	};

	const feed: JSONFeed = {
		version: 'https://jsonfeed.org/version/1.1',
		title: feedContent.title,
		home_page_url: new URL('https://ashernorland.com').toString(),
		feed_url: new URL(event.path, 'https://ashernorland.com').toString(),
		description: feedContent.description,
		user_comment: 'Copyright © ' + new Date().getFullYear() + ' Asher Norland',
		icon: new URL('/favicon.ico', 'https://ashernorland.com').toString(),
		favicon: new URL('/favicon.ico', 'https://ashernorland.com').toString(),
		author: [author],
		language: 'en-US',
		expired: false,
		items: [],
	};

	const data = await queryCollection(event, category)
		.where('published', '=', true)
		.order('date_published', 'DESC')
		.all();

	for (const post of data) {
		let contentPath = post.path;
		contentPath = contentPath ??= '/';

		const item: JSONFeedItem = {
			id: post.id,
			url: new URL(contentPath, 'https://ashernorland.com').toString(),
			title: post.title,
			content_html: '',
			summary: post.description,
			date_published: new Date(post.date_published).toISOString(),
			date_modified: new Date(post.date_modified).toISOString(),
			author: [author],
			tags: [],
			language: 'en-US',
			attachments: [],
		};
		feed.items.push(item);
	}

	setResponseHeader(event, 'Content-Type', 'application/feed+json');

	return feed;
});
