
export enum TMDBMediaType {
	Movie = 'movie',
	Show = 'tv'
}

export interface TMDBGenre {
	id: number
	name: string
}

export type TMDBMedia = {
	backdrop_path: string
	id: number
	title: string
	media_type?: MediaType
	genres: Genre[]
	release_date?: string
	poster_path: string
}
