<template>
	<UPageList>
		<UPageCard
			v-for="item in items"
			:key="item.path"
			:title="item.title"
			:description="item.position"
			class="shadow-md hover:shadow-lg transition-shadow duration-300"
		>
			<div class="space-y-4">
				<p
					v-if="item.description"
					class="text-gray-700 dark:text-gray-300"
				>
					{{ item.description }}
				</p>

				<UPageFeature
					v-if="item.tags && item.tags.length"
					title="Technologies"
					icon="i-heroicons-code-bracket"
				>
					<template #description>
						<div class="flex flex-wrap gap-2">
							<UBadge
								v-for="tech in item.tags"
								:key="tech"
								color="neutral"
								variant="soft"
								size="xs"
							>
								{{ tech }}
							</UBadge>
						</div>
					</template>
				</UPageFeature>

				<UPageFeature
					v-if="item.achievements && item.achievements.length"
					title="Key Achievements"
					icon="i-heroicons-trophy"
				>
					<template #description>
						<ul class="space-y-1">
							<li
								v-for="achievement in item.achievements"
								:key="achievement"
								class="flex items-start text-sm text-gray-600 dark:text-gray-400"
							>
								<UIcon
									name="i-heroicons-check-circle"
									class="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0"
								/>
								{{ achievement }}
							</li>
						</ul>
					</template>
				</UPageFeature>

				<UPageFeature
					v-if="item.location"
					title="Location"
					icon="i-heroicons-map-pin"
				>
					<template #description>
						<span class="text-sm text-gray-600 dark:text-gray-400">
							{{ item.location }}
						</span>
					</template>
				</UPageFeature>
			</div>

			<template #footer>
				<div class="flex items-center justify-end">
					<UButton
						v-if="item.link"
						:to="item.link"
						target="_blank"
						color="primary"
						variant="ghost"
						size="xs"
						trailing-icon="i-heroicons-arrow-top-right-on-square"
					>
						View Company
					</UButton>
				</div>
			</template>
		</UPageCard>
	</UPageList>
</template>

<script setup lang="ts">
const items = await queryCollection('career')
	.order('start_date', 'DESC')
	.all();
</script>
