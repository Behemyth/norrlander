import { createFeedHandler } from '../../_handler';

export default createFeedHandler({
	collection: 'show',
	config: {
		title: 'Show Reviews',
		description: 'A collection of my TV show reviews.',
		feedPath: '/feed/review/show',
		homePath: '/review/show',
	},
});
