import { defineContentConfig, defineCollection } from '@nuxt/content';

import { asSeoCollection } from '@nuxtjs/seo/content';
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
			source: 'blog/*.md',
			schema: BlogSchema,
		}),
		photography: defineCollection({
			type: 'page',
			source: 'photography/*.md',
			schema: PhotographySchema,
		}),
		academic: defineCollection({
			type: 'page',
			source: 'portfolio/academic/*.md',
			schema: AcademicSchema,
		}),
		career: defineCollection({
			type: 'page',
			source: 'portfolio/career/*.md',
			schema: JobSchema,
		}),
		project: defineCollection({
			type: 'page',
			source: 'portfolio/project/*.md',
			schema: ProjectSchema,
		}),
		movie: defineCollection({
			type: 'page',
			source: 'review/movie/*.md',
			schema: ReviewMovieSchema,
		}),
		show: defineCollection({
			type: 'page',
			source: 'review/show/*.md',
			schema: ReviewShowSchema,
		}),
		content: defineCollection(
			asSeoCollection({
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
					],
				},
				schema: ContentSchema,
			}),
		),
	},
});
