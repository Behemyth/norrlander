<template>
	<UPageCard
		:title="kind"
		:to="to"
		variant="subtle"
		orientation="horizontal"
		reverse
		class="group"
		:ui="{ title: 'text-xl sm:text-2xl', description: 'mt-2' }"
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
			<div class="flex items-center justify-between gap-2 text-xs text-muted">
				<span v-if="date">{{ formattedDate }}</span>
				<UBadge
					v-if="count != null"
					variant="outline"
					color="neutral"
					size="sm"
				>
					{{ count }} {{ $t('index.stats.total') }}
				</UBadge>
			</div>
		</template>
		<NuxtImg
			v-if="image"
			:src="image"
			:alt="title"
			class="rounded-md aspect-3/2 object-cover w-full opacity-70 saturate-75 transition-[opacity,filter] duration-300 group-hover:opacity-100 group-hover:saturate-100"
			loading="lazy"
		/>
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
}>();

const formattedDate = computed(() => {
	if (!props.date) return '';
	const d = typeof props.date === 'string' ? new Date(props.date) : props.date;
	return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
});
</script>
