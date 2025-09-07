<template>
	<UFooter>
		<UNavigationMenu
			:items="items"
			color="neutral"
			variant="link"
		/>

		<template #left>
			<AppProfileCard
				orientation="horizontal"
				variant="ghost"
			/>
		</template>

		<template #right>
			<UButton
				v-for="social in socials"
				:key="social.name"
				:icon="social.icon"
				color="neutral"
				variant="ghost"
				:to="social.link"
				target="_blank"
				:title="social.name"
				size="lg"
			/>
		</template>

		<template #bottom>
			<span class="flex flex-wrap flex-row items-center justify-around gap-x-3 gap-y-1.5 text-(--ui-text-muted) text-sm">
				<span>Copyright &copy;
					{{ new Date().getFullYear() }}
				</span>

				<span>
					<ULink to="/about#film-data">Film data</ULink>
					<div class="inline" /> from
					<ULink to="https://www.themoviedb.org/">TMDb</ULink>
				</span>
				<AppLanguageSwitch />
				<span>Made with ❤️ by Asher and Ola</span>
			</span>
		</template>
	</UFooter>
</template>

<script setup lang="ts">
const { t } = useI18n();

const items = computed(() => [
	{
		label: 'About',
		to: '/about',
	},
	{
		label: t('contact'),
		to: '/contact',
	},
]);

const { data: socials } = await useSocialsData();
</script>
