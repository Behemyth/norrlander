<template>
	<UPageCard
		:title="kind"
		:to="to"
		variant="subtle"
		orientation="horizontal"
		reverse
		class="group"
		:ui="{
			title: 'text-xl sm:text-2xl',
			description: 'mt-2',
			footer: 'w-full',
		}"
	>
		<template #description>
			<div class="flex flex-col gap-1">
				<span class="text-xs uppercase tracking-wide text-muted">
					{{ $t('index.latest') }}
				</span>
				<span class="text-base font-medium text-default line-clamp-1">
					{{ title }}
				</span>
				<span
					v-if="description"
					class="text-sm text-muted line-clamp-2"
				>
					{{ description }}
				</span>
			</div>
		</template>
		<template
			v-if="date || count != null"
			#footer
		>
			<div class="flex justify-between text-xs text-muted">
				<span v-if="date">
					{{ formattedDate }}
				</span>
				<span
					v-if="count != null"
					class="tabular-nums"
				>
					{{ count }} {{ $t('index.stats.total') }}
				</span>
			</div>
		</template>
		<div
			v-if="image"
			class="relative aspect-3/2 w-full overflow-hidden rounded-md opacity-70 saturate-75 transition-[opacity,filter] duration-300 group-hover:opacity-100 group-hover:saturate-100"
			:style="imageAspect === 'poster' ? backdropStyle : undefined"
		>
			<!-- Workaround for nuxt/image#1433: every vw entry needs a breakpoint prefix
				(no bare values, and no xs: — it's not in the default screens). -->
			<NuxtImg
				:src="image"
				:alt="title"
				:placeholder="img(image, { height: 10, blur: 2, quality: 50 })"
				sizes="sm:100vw md:50vw lg:320px"
				:class="[
					'h-full w-full',
					imageAspect === 'poster' ? 'object-contain' : 'object-cover',
				]"
				loading="lazy"
			/>
		</div>
	</UPageCard>
</template>

<script setup lang="ts">
const props = defineProps<{
	title: string;
	description?: string;
	to: string;
	icon?: string;
	kind?: string;
	date?: string | Date;
	count?: number;
	image?: string;
	imageAspect?: 'landscape' | 'poster';
}>();

const img = useImage();

const formattedDate = computed(() => {
	if (!props.date) return '';
	const d = typeof props.date === 'string' ? new Date(props.date) : props.date;
	return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
});

const backdropStyle = computed(() => {
	if (!props.image) return undefined;
	const url = img(props.image, { width: 60, height: 90, blur: 20, quality: 40 });
	return {
		backgroundImage: `url("${url}")`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	};
});
</script>
