/**
 * Shared composable for homepage content counts. The single `index-stats` key
 * lets the homepage and the `Stats` component reuse one fetch.
 */
export const useIndexStats = () =>
	useAsyncData('index-stats', async () => {
		const [blog, photography, project, movie, show] = await Promise.all([
			queryCollection('blog').count(),
			queryCollection('photography').count(),
			queryCollection('project').count(),
			queryCollection('movie').count(),
			queryCollection('show').count(),
		]);
		return { blog, photography, project, reviews: movie + show };
	});
