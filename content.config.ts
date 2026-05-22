import { defineContentConfig, defineCollection } from '@nuxt/content';

import { defineRobotsSchema } from '@nuxtjs/robots/content';
import { defineSitemapSchema } from '@nuxtjs/sitemap/content';
import {
	ReviewMovieSchema,
	ReviewShowSchema,
	PhotographySchema,
	BlogSchema,
	AcademicSchema,
	ProjectSchema,
	JobSchema,
	ContentSchema,
	ContactSchema,
	SocialSchema,
	CommunitySchema,
	LocationSchema,
} from './shared/types/content';

const SeoFields = { robots: defineRobotsSchema(), sitemap: defineSitemapSchema() };

// Drafts are visible in dev for previewing, but excluded
// from production builds. Override with `NUXT_INCLUDE_DRAFTS=true` to include drafts in a prod build.
const excludeDrafts = process.env.NUXT_INCLUDE_DRAFTS === 'true'
	? false
	: process.env.NODE_ENV === 'production';
const draftExclude: string[] = excludeDrafts ? ['**/_*.md'] : [];

// Collection definitions

export default defineContentConfig({
	collections: {
		contact: defineCollection({
			type: 'data',
			source: 'data/contact/*.json',
			schema: ContactSchema,
		}),
		socials: defineCollection({
			type: 'data',
			source: 'data/socials/*.json',
			schema: SocialSchema,
		}),
		locations: defineCollection({
			type: 'data',
			source: 'data/locations/*.json',
			schema: LocationSchema,
		}),
		communities: defineCollection({
			type: 'data',
			source: 'data/community/*.json',
			schema: CommunitySchema,
		}),
		blog: defineCollection({
			type: 'page',
			source: { include: 'blog/*.md', exclude: draftExclude },
			schema: BlogSchema.extend(SeoFields),
		}),
		photography: defineCollection({
			type: 'page',
			source: { include: 'photography/*.md', exclude: draftExclude },
			schema: PhotographySchema.extend(SeoFields),
		}),
		academic: defineCollection({
			type: 'page',
			source: { include: 'portfolio/academic/*.md', exclude: draftExclude },
			schema: AcademicSchema.extend(SeoFields),
		}),
		career: defineCollection({
			type: 'page',
			source: { include: 'portfolio/career/*.md', exclude: draftExclude },
			schema: JobSchema.extend(SeoFields),
		}),
		project: defineCollection({
			type: 'page',
			source: { include: 'portfolio/project/*.md', exclude: draftExclude },
			schema: ProjectSchema.extend(SeoFields),
		}),
		movie: defineCollection({
			type: 'page',
			source: { include: 'review/movie/*.md', exclude: draftExclude },
			schema: ReviewMovieSchema.extend(SeoFields),
		}),
		show: defineCollection({
			type: 'page',
			source: { include: 'review/show/*.md', exclude: draftExclude },
			schema: ReviewShowSchema.extend(SeoFields),
		}),
		content: defineCollection({
			type: 'page',
			source:
			{
				include: '**/*.md',
				exclude: [
					'data/**',
					'blog/*.md',
					'photography/*.md',
					'portfolio/academic/*.md',
					'portfolio/career/*.md',
					'portfolio/project/*.md',
					'review/movie/*.md',
					'review/show/*.md',
					...draftExclude,
				],
			},
			schema: ContentSchema.extend(SeoFields),
		}),
	},
});
