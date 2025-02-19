import type { PageCollections } from '@nuxt/content';

export default defineEventHandler(async (event) => {
	let category: keyof PageCollections;

	try {
		category = getRouterParam(event, 'category') as keyof PageCollections;
	}
	catch {
		throw createError({
			statusCode: 404,
			statusMessage:
				'The given category is not a valid category.',
		});
	}

	const feedContent = await queryCollection(event, 'feed')
		.where('category', '=', category)
		.first();

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

	for (const page of data) {
		let contentPath = page.path;
		contentPath = contentPath ??= '/';

		const item: JSONFeedItem = {
			id: page.id,
			url: new URL(contentPath, 'https://ashernorland.com').toString(),
			title: page.title,
			content_html: '',
			summary: page.description,
			date_published: new Date(page.date_published).toISOString(),
			date_modified: new Date(page.date_modified).toISOString(),
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
