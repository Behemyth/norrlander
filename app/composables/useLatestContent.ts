/**
 * Shared composables for querying latest content across collections.
 */

export const useLatestBlog = (limit?: number) =>
	useAsyncData(`blog-latest-${limit ?? 'all'}`, () => {
		let query = queryCollection('blog')
			.select('title', 'description', 'path', 'date_published')
			.where('draft', '=', false)
			.order('date_published', 'DESC');
		if (limit) query = query.limit(limit);
		return query.all();
	});

export const useLatestPhotography = (limit?: number) =>
	useAsyncData(`photography-latest-${limit ?? 'all'}`, () => {
		let query = queryCollection('photography')
			.where('draft', '=', false)
			.order('date_published', 'DESC');
		if (limit) query = query.limit(limit);
		return query.all();
	});

export const useLatestProjects = (limit?: number) =>
	useAsyncData(`project-latest-${limit ?? 'all'}`, () => {
		let query = queryCollection('project')
			.select('title', 'description', 'path', 'link', 'image', 'date_published')
			.where('draft', '=', false)
			.order('date_published', 'DESC');
		if (limit) query = query.limit(limit);
		return query.all();
	});

export const useLatestReviews = (limit: number, collection?: 'movie' | 'show') =>
	useAsyncData(`review-latest-${limit}-${collection ?? 'all'}`, async () => {
		const movieQuery = (n: number) =>
			queryCollection('movie')
				.select('id', 'title', 'path', 'rating', 'date_published', 'poster_path')
				.where('draft', '=', false)
				.order('date_published', 'DESC')
				.limit(n);

		const showQuery = (n: number) =>
			queryCollection('show')
				.select('id', 'title', 'path', 'rating', 'date_published', 'poster_path', 'season_number')
				.where('draft', '=', false)
				.order('date_published', 'DESC')
				.limit(n);

		if (collection === 'movie') {
			return movieQuery(limit).all();
		}
		if (collection === 'show') {
			return showQuery(limit).all();
		}

		const [movies, shows] = await Promise.all([
			movieQuery(limit).all(),
			showQuery(limit).all(),
		]);

		return [...movies, ...shows]
			.sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime())
			.slice(0, limit);
	});

export interface ContentCardProps {
	title: string;
	description?: string;
	to: string;
	icon?: string;
	kind?: string;
	date?: string | Date;
	count?: number;
	image?: string;
}
