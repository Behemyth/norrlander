<template>
	<div>
		<NuxtLayout
			name="content"
			:toc="toc"
		>
			<UBreadcrumb
				:items="items"
				class="m-2"
			/>

			<ContentRenderer
				:value="page"
			/>

			<ProseH2 :id="recentMoviesID">
				{{ recentMoviesText }}
			</ProseH2>

			<ReviewMovieCardGrid :movies="movies" />

			<ProseH2 :id="recentShowsID">
				{{ recentShowsText }}
			</ProseH2>

			<ReviewShowCardGrid :shows="shows" />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
const i18n = useI18n();

const movies = await queryCollection('movie')
	.order('date_published', 'DESC').limit(6).all();

const shows = await queryCollection('show')
	.order('date_published', 'DESC').limit(6).all();

const page = await queryCollection('page').where('title', '=', 'Review').first();

definePageMeta({
	layout: false,
});

useSeoMeta({
	title: 'Reviews',
});

const items = [
	{
		label: 'Home',
		to: '/',
	},
	{
		label: 'Reviews',
		to: '/review',
	},
];

// We have to manually create some of the ToC
const toc = computed(() => {
	const contentToC = page.body.toc!;

	contentToC.title = 'Reviews';

	contentToC.links.push(
		{
			id: recentMoviesID,
			text: recentMoviesText.value,
			depth: 0,
		},
	);

	contentToC.links.push(
		{
			id: recentShowsID,
			text: recentShowsText.value,
			depth: 0,
		},
	);

	return contentToC;
});

const recentMoviesID = 'recent-movies';
const recentShowsID = 'recent-shows';

const recentMoviesText = computed(() =>	i18n.t(recentMoviesID));
const recentShowsText = computed(() => i18n.t(recentShowsID));
</script>
