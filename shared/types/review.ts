export enum ReviewMediaType {
	Movie = 'movie',
	Show = 'show'
}

export interface ReviewMetadata {
	intRating: number,
	entRating: number,
	rating: number
	path: string
	title: string
	description: string
	TMDB_ID: number
	date_published: string
	date_modified: string
}
