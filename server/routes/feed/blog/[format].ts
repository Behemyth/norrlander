import { createFeedHandler } from '../_handler';

export default createFeedHandler({
	collection: 'blog',
	config: {
		title: 'Blog',
		description: 'A collection of my blog posts and articles.',
		feedPath: '/feed/blog',
		homePath: '/blog',
	},
});
