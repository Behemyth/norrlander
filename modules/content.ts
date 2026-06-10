import type { FileAfterParseHook } from '@nuxt/content';

import { defineNuxtModule } from '@nuxt/kit';

import { $fetch } from 'ofetch';

import type { TMDBMovie, TMDBShow, TMDBSeason, TMDBCredits } from '~~/shared/types/tmdb';

const KEPT_CREW_JOBS = ['Director', 'Screenplay', 'Writer', 'Story'];

/**
 * Trim credits to only the data the UI needs:
 * - Top 10 cast by billing order, without profile_path
 * - Only Director/Writer/Screenplay/Story crew, without profile_path
 */
function trimCredits(credits: TMDBCredits): TMDBCredits {
	return {
		cast: credits.cast
			.sort((a, b) => a.order - b.order)
			.slice(0, 10)
			.map(({ profile_path: _, ...rest }) => rest),
		crew: credits.crew
			.filter(m => KEPT_CREW_JOBS.includes(m.job))
			.map(({ profile_path: _, ...rest }) => rest),
	};
}

function addUniquePerson(names: string[], name: string | undefined | null) {
	const trimmed = name?.trim();
	if (trimmed && !names.includes(trimmed)) {
		names.push(trimmed);
	}
}

export function peopleFromTmdb(tmdbData: TMDBMovie | TMDBShow): string[] {
	const people: string[] = [];
	for (const member of tmdbData.credits?.cast ?? []) {
		addUniquePerson(people, member.name);
	}
	for (const member of tmdbData.credits?.crew ?? []) {
		addUniquePerson(people, member.name);
	}
	if ('created_by' in tmdbData) {
		for (const creator of tmdbData.created_by ?? []) {
			addUniquePerson(people, creator.name);
		}
	}
	return people;
}

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
	return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function stringValue(value: unknown): string | undefined {
	return typeof value === 'string' ? value.trim() || undefined : undefined;
}

function personNameFromNode(node: UnknownRecord): string | undefined {
	const type = stringValue(node.type);
	const name = stringValue(node.name) ?? stringValue(node.tag) ?? stringValue(node.component) ?? stringValue(node.componentName);
	if (name !== 'person' && name !== 'Person') return undefined;
	if (type && !['textComponent', 'leafComponent', 'component', 'containerComponent'].includes(type)) return undefined;

	for (const key of ['props', 'attributes', 'attrs']) {
		const attrs = node[key];
		if (!isRecord(attrs)) continue;
		const mentionedName = stringValue(attrs.name);
		if (mentionedName) return mentionedName;
	}
	return undefined;
}

export function personMentionsFromBody(body: unknown): string[] {
	const mentions: string[] = [];

	function visit(value: unknown) {
		if (Array.isArray(value)) {
			for (const child of value) visit(child);
			return;
		}
		if (!isRecord(value)) return;

		addUniquePerson(mentions, personNameFromNode(value));
		for (const child of Object.values(value)) {
			visit(child);
		}
	}

	visit(body);
	return mentions;
}

export function unknownPersonMentions(body: unknown, knownPeople: readonly string[]): string[] {
	const known = new Set(knownPeople);
	return personMentionsFromBody(body).filter(name => !known.has(name));
}

function warnOrThrowUnknownPersonMentions(content: Record<string, unknown>, people: readonly string[]) {
	const unknown = unknownPersonMentions(content.body, people);
	if (unknown.length === 0) return;

	const location = stringValue(content.path) ?? stringValue(content.title) ?? 'unknown review';
	const message = `[content] Unknown :person mention${unknown.length === 1 ? '' : 's'} in ${location}: ${unknown.map(name => `"${name}"`).join(', ')}. Match TMDB credit names exactly so review-grid links can resolve.`;
	if (process.env.NUXT_CONTENT_PERSON_MENTION_STRICT === 'true') {
		throw new Error(message);
	}
	console.warn(message);
}

/**
 * Prefix a TMDB image path so NuxtImg resolves it via the `tmdb` alias.
 */
function toImageSrc(path: string): string {
	return `tmdb${path}`;
}

/**
 * Extract the 4-digit year from a TMDB date string (YYYY-MM-DD). Returns
 * `undefined` when the date is missing or malformed so the consumer can omit
 * the field entirely.
 */
function yearFromTmdbDate(dateStr: string | undefined | null): number | undefined {
	if (!dateStr) return undefined;
	const d = new Date(dateStr);
	if (Number.isNaN(d.getTime())) return undefined;
	return d.getFullYear();
}

export default defineNuxtModule({
	setup(resolvedOptions, nuxt) {
		// Skip TMDB fetching in test environment
		const isTestEnv = process.env.NODE_ENV === 'test' || process.env.VITEST === 'true';

		if (isTestEnv) {
			return;
		}

		nuxt.hook('content:file:afterParse' as any, async (ctx: FileAfterParseHook) => {
			// Read env at hook-invocation time
			const apiSecret = process.env.NUXT_API_SECRET ?? '';
			const apiBase = process.env.NUXT_PUBLIC_API_BASE ?? '';
			const hasApiCredentials = Boolean(apiSecret && apiBase);
			if (!hasApiCredentials) {
				// Stub minimal data so the layout renders with placeholders
				switch (ctx.collection.name) {
					case 'movie':
						ctx.content.tmdbData = {
							backdrop_path: '/images/placeholder-backdrop.svg',
							id: Number(ctx.content.TMDB_ID),
							genres: [],
							poster_path: '/images/placeholder-poster.svg',
							title: String(ctx.content.title || `Movie ${ctx.content.TMDB_ID}`),
						} satisfies TMDBMovie;
						ctx.content.poster_path = '/images/placeholder-poster.svg';
						ctx.content.backdrop_path = '/images/placeholder-backdrop.svg';
						ctx.content.genres = [];
						ctx.content.people = [];
						break;
					case 'show':
						ctx.content.tmdbData = {
							backdrop_path: '/images/placeholder-backdrop.svg',
							id: Number(ctx.content.TMDB_ID),
							genres: [],
							poster_path: '/images/placeholder-poster.svg',
							name: String(ctx.content.title || `Show ${ctx.content.TMDB_ID}`),
						} satisfies TMDBShow;
						ctx.content.poster_path = '/images/placeholder-poster.svg';
						ctx.content.backdrop_path = '/images/placeholder-backdrop.svg';
						ctx.content.genres = [];
						ctx.content.people = [];
						break;
					default:
				}
				return;
			}

			switch (ctx.collection.name) {
				case 'movie':
				{
					const tmdbData = await $fetch<TMDBMovie>(`/movie/${ctx.content.TMDB_ID}`, {
						baseURL: `${apiBase}`,
						params: {
							language: 'en-US',
							append_to_response: 'credits',
						},
						headers: {
							Authorization: `Bearer ${apiSecret}`,
						},
						retry: 5,
						retryDelay: 500,
						retryStatusCodes: [408, 425, 429, 500, 502, 503, 504],
					});

					ctx.content.title = tmdbData.title;
					if (tmdbData.credits) {
						tmdbData.credits = trimCredits(tmdbData.credits);
					}
					tmdbData.poster_path = toImageSrc(tmdbData.poster_path);
					tmdbData.backdrop_path = toImageSrc(tmdbData.backdrop_path);
					ctx.content.tmdbData = tmdbData;
					ctx.content.poster_path = tmdbData.poster_path;
					ctx.content.backdrop_path = tmdbData.backdrop_path;
					ctx.content.genres = (tmdbData.genres ?? []).map(g => g.name);
					const people = peopleFromTmdb(tmdbData);
					ctx.content.people = people;
					warnOrThrowUnknownPersonMentions(ctx.content, people);
					const movieYear = yearFromTmdbDate(tmdbData.release_date);
					if (movieYear !== undefined) ctx.content.release_year = movieYear;
					break;
				}
				case 'show':
				{
					const [tmdbData, seasonTmdbData] = await Promise.all([
						$fetch<TMDBShow>(`/tv/${ctx.content.TMDB_ID}`, {
							baseURL: `${apiBase}`,
							params: {
								language: 'en-US',
								append_to_response: 'credits',
							},
							headers: {
								Authorization: `Bearer ${apiSecret}`,
							},
							retry: 5,
							retryDelay: 500,
							retryStatusCodes: [408, 425, 429, 500, 502, 503, 504],
						}),
						ctx.content.season_number !== undefined
							? $fetch<TMDBSeason>(
									`/tv/${ctx.content.TMDB_ID}/season/${ctx.content.season_number}`,
									{
										baseURL: `${apiBase}`,
										params: {
											language: 'en-US',
										},
										headers: {
											Authorization: `Bearer ${apiSecret}`,
										},
										retry: 5,
										retryDelay: 500,
										retryStatusCodes: [408, 425, 429, 500, 502, 503, 504],
									},
								)
							: Promise.resolve(undefined),
					]);

					ctx.content.title = tmdbData.name;
					if (tmdbData.credits) {
						tmdbData.credits = trimCredits(tmdbData.credits);
					}
					tmdbData.poster_path = toImageSrc(tmdbData.poster_path);
					tmdbData.backdrop_path = toImageSrc(tmdbData.backdrop_path);
					ctx.content.tmdbData = tmdbData;
					ctx.content.backdrop_path = tmdbData.backdrop_path;
					ctx.content.genres = (tmdbData.genres ?? []).map(g => g.name);
					const people = peopleFromTmdb(tmdbData);
					ctx.content.people = people;
					warnOrThrowUnknownPersonMentions(ctx.content, people);

					if (seasonTmdbData) {
						if (seasonTmdbData.poster_path) {
							seasonTmdbData.poster_path = toImageSrc(seasonTmdbData.poster_path);
						}
						ctx.content.seasonTmdbData = seasonTmdbData;
						ctx.content.title = `${tmdbData.name}: Season ${ctx.content.season_number}`;
						ctx.content.poster_path = seasonTmdbData.poster_path ?? tmdbData.poster_path;
						const seasonYear = yearFromTmdbDate(seasonTmdbData.air_date);
						if (seasonYear !== undefined) ctx.content.release_year = seasonYear;
					}
					else {
						ctx.content.poster_path = tmdbData.poster_path;
					}
					if (ctx.content.release_year === undefined) {
						const showYear = yearFromTmdbDate(tmdbData.first_air_date);
						if (showYear !== undefined) ctx.content.release_year = showYear;
					}
					break;
				}
				default:
			}
		});
	},
});
