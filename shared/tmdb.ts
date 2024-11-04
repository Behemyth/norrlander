
export enum MediaType {
	Movie = 'movie',
	Show = 'tv'
}

export interface Genre {
	id: number
	name: string
}

export type Media = {
	backdrop_path: string
	id: number
	title: string
	media_type?: MediaType
	genres: Genre[]
	release_date?: string
	poster_path: string
}
