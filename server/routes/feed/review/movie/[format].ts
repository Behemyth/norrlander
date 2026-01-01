import { createFeedHandler } from '../../_handler';

export default createFeedHandler({
	collection: 'movie',
	config: {
		title: 'Movie Reviews',
		description: 'A collection of my movie reviews.',
		feedPath: '/feed/review/movie',
		homePath: '/review/movie',
	},
});
