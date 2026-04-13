import type { MovieCollectionItem, ShowCollectionItem } from '@nuxt/content';
import type { TMDBCastMember, TMDBCrewMember, TMDBMovie, TMDBShow, TMDBCreator, TMDBCredits, TMDBSeason } from '~~/shared/types/tmdb';

export type ReviewContent = MovieCollectionItem | ShowCollectionItem;

/**
 * Type guard to check if the review content is for a movie
 */
export function isMovieReview(content: ReviewContent): content is MovieCollectionItem {
	return content.tmdbData != null && 'title' in content.tmdbData;
}

/**
 * Type guard to check if the review content is for a show
 */
export function isShowReview(content: ReviewContent): content is ShowCollectionItem {
	return content.tmdbData != null && 'name' in content.tmdbData;
}

/**
 * Type guard to check if the review is for a specific season
 */
export function isSeasonReview(content: ReviewContent): content is ShowCollectionItem & { season_number: number; seasonTmdbData: TMDBSeason } {
	return isShowReview(content) && content.season_number !== undefined && content.seasonTmdbData !== undefined;
}

/**
 * Composable for extracting and normalizing review metadata from TMDB data
 */
export function useReviewMetadata(content: ReviewContent) {
	const isMovie = computed(() => isMovieReview(content));
	const isShow = computed(() => isShowReview(content));
	const isSeason = computed(() => isSeasonReview(content));

	// Get the TMDB data with proper typing
	const movieData = computed(() =>
		isMovie.value ? content.tmdbData as TMDBMovie : null,
	);

	const showData = computed(() =>
		isShow.value ? content.tmdbData as TMDBShow : null,
	);

	// Season-specific TMDB data
	const seasonData = computed(() =>
		isSeason.value ? (content as ShowCollectionItem).seasonTmdbData as TMDBSeason : null,
	);

	// Season number (if this is a seasonal review)
	const seasonNumber = computed(() =>
		isShow.value ? (content as ShowCollectionItem).season_number : null,
	);

	// Normalized display title
	const displayTitle = computed(() => {
		if (!content.tmdbData) return content.title ?? '';
		return isMovie.value
			? (content.tmdbData as TMDBMovie).title
			: (content.tmdbData as TMDBShow).name;
	});

	// Release year extracted from date string
	// For seasonal reviews, use the season's air_date
	const releaseYear = computed(() => {
		// Seasonal reviews use season air date
		if (isSeason.value && seasonData.value?.air_date) {
			return new Date(seasonData.value.air_date).getFullYear();
		}

		if (!content.tmdbData) return null;
		const dateStr = isMovie.value
			? (content.tmdbData as TMDBMovie).release_date
			: (content.tmdbData as TMDBShow).first_air_date;

		if (!dateStr) return null;
		return new Date(dateStr).getFullYear();
	});

	// Full release date
	// For seasonal reviews, use the season's air_date
	const releaseDate = computed(() => {
		if (isSeason.value && seasonData.value?.air_date) {
			return new Date(seasonData.value.air_date);
		}

		if (!content.tmdbData) return null;
		const dateStr = isMovie.value
			? (content.tmdbData as TMDBMovie).release_date
			: (content.tmdbData as TMDBShow).first_air_date;

		if (!dateStr) return null;
		return new Date(dateStr);
	});

	// Genres as comma-separated string
	const genresString = computed(() =>
		content.tmdbData?.genres?.map(g => g.name).join(', ') ?? '',
	);

	// Genres as array
	const genres = computed(() =>
		content.tmdbData?.genres ?? [],
	);

	// Runtime formatted as "Xh Ym" (movies only)
	const formattedRuntime = computed(() => {
		if (!isMovie.value || !content.tmdbData) return null;

		const runtime = (content.tmdbData as TMDBMovie).runtime;
		if (!runtime) return null;

		const hours = Math.floor(runtime / 60);
		const minutes = runtime % 60;

		if (hours > 0 && minutes > 0) {
			return `${hours}h ${minutes}m`;
		}
		else if (hours > 0) {
			return `${hours}h`;
		}
		return `${minutes}m`;
	});

	// Raw runtime in minutes (movies only)
	const runtimeMinutes = computed(() =>
		isMovie.value && content.tmdbData ? (content.tmdbData as TMDBMovie).runtime : null,
	);

	// Show-specific: number of seasons
	const numberOfSeasons = computed(() =>
		isShow.value && content.tmdbData ? (content.tmdbData as TMDBShow).number_of_seasons : null,
	);

	// Show-specific: number of episodes
	// For seasonal reviews, use the season's episode_count
	const numberOfEpisodes = computed(() => {
		if (isSeason.value && seasonData.value?.episode_count) {
			return seasonData.value.episode_count;
		}
		return isShow.value && content.tmdbData ? (content.tmdbData as TMDBShow).number_of_episodes : null;
	});

	// Season-specific: episode count for this season only
	const seasonEpisodeCount = computed(() =>
		seasonData.value?.episode_count ?? null,
	);

	// Poster path - use season poster if available, otherwise show/movie poster
	const posterPath = computed(() => {
		if (isSeason.value && seasonData.value?.poster_path) {
			return seasonData.value.poster_path;
		}
		return content.tmdbData?.poster_path ?? '';
	});

	// Published date from the content (review publish date)
	const publishedDate = computed(() => {
		const date = content.date_published;
		if (!date) return null;
		return new Date(date);
	});

	// Formatted published date
	const formattedPublishedDate = computed(() => {
		if (!publishedDate.value) return null;
		return publishedDate.value.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	});

	// Credits data - cast to proper type since @nuxt/content types may not have caught up
	const credits = computed(() => content.tmdbData ? (content.tmdbData as TMDBMovie & { credits?: TMDBCredits }).credits : undefined);

	// Get top cast members (sorted by order)
	const getTopCast = (limit: number = 5): ComputedRef<TMDBCastMember[]> => {
		return computed(() => {
			if (!credits.value?.cast) return [];
			return [...credits.value.cast]
				.sort((a, b) => a.order - b.order)
				.slice(0, limit);
		});
	};

	// All cast members
	const cast = computed(() => credits.value?.cast ?? []);

	// Get directors from crew
	const directors = computed((): TMDBCrewMember[] => {
		if (!credits.value?.crew) return [];
		return credits.value.crew.filter((member: TMDBCrewMember) => member.job === 'Director');
	});

	// Get writers/screenplay from crew
	const writers = computed((): TMDBCrewMember[] => {
		if (!credits.value?.crew) return [];
		return credits.value.crew.filter((member: TMDBCrewMember) =>
			member.job === 'Screenplay'
			|| member.job === 'Writer'
			|| member.job === 'Story',
		);
	});

	// Show creators (for TV shows)
	const creators = computed((): TMDBCreator[] => {
		if (!isShow.value || !content.tmdbData) return [];
		return (content.tmdbData as TMDBShow).created_by ?? [];
	});

	// Combined director/creator names for display
	const primaryCreators = computed(() => {
		if (isMovie.value) {
			return directors.value.map(d => d.name);
		}
		return creators.value.map(c => c.name);
	});

	// Writer names for display
	const writerNames = computed(() => writers.value.map(w => w.name));

	// Unique writer names (remove duplicates)
	const uniqueWriterNames = computed(() => [...new Set(writerNames.value)]);

	return {
		// Type guards
		isMovie,
		isShow,
		isSeason,

		// Typed data access
		movieData,
		showData,
		seasonData,

		// Normalized fields
		displayTitle,
		releaseYear,
		releaseDate,
		genres,
		genresString,
		posterPath,

		// Movie-specific
		formattedRuntime,
		runtimeMinutes,

		// Show-specific
		numberOfSeasons,
		numberOfEpisodes,

		// Season-specific
		seasonNumber,
		seasonEpisodeCount,

		// Review metadata
		publishedDate,
		formattedPublishedDate,

		// Credits
		credits,
		cast,
		getTopCast,
		directors,
		writers,
		creators,
		primaryCreators,
		writerNames,
		uniqueWriterNames,
	};
}
