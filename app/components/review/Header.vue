<template>
	<div class="flex flex-col">
		<UPageHeader
			:title="content.title"
			:ui="{ root: 'pb-4' }"
		>
			<template #title>
				<div class="flex flex-col">
					<ProseH1 class="!mb-2 text-3xl font-bold">
						{{ content.title }}
					</ProseH1>
					<div class="flex flex-row items-center mt-1 flex-wrap">
						<ReviewStarRating
							:value="Number(content.rating)"
							:size="24"
							class="mr-4"
						/>
						<ProseP class="!my-0 text-lg mx-2">
							Release Year
						</ProseP>
						<ProseP class="!my-0 text-lg mx-2">
							Genre
						</ProseP>
						<ProseP class="!my-0 text-lg mx-2">
							Runtime
						</ProseP>
					</div>
				</div>
			</template>

			<template #description>
				<div class="flex flex-row flex-wrap items-center gap-x-4 mt-2">
					<ProseP class="!my-0 text-lg">
						Asher Norland
					</ProseP>
					<ProseP class="!my-0 text-lg">
						Published Date
					</ProseP>
					<ProseP class="!my-0 text-lg">
						Time to Read
					</ProseP>
				</div>
			</template>
		</UPageHeader>

		<NuxtPicture
			:src="`tmdb/${content.tmdbData.backdrop_path}`"
			:alt="content.title"
			:img-attrs="{ class: 'object-cover w-full aspect-[12/5]' }"
		/>
	</div>
</template>

<script setup lang="ts">
import type { MovieCollectionItem, ShowCollectionItem } from '@nuxt/content';

defineProps<{
	content: MovieCollectionItem | ShowCollectionItem;
}>();
</script>
