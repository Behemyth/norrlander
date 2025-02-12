<template>
	<DFooter>
		<UNavigationMenu
			:items="items"
			color="neutral"
			variant="link"
		/>

		<template #left>
			<ULink
				to="/"
				rel="author"
			>
				<UAvatar
					size="2xl"
					src="https://www.gravatar.com/avatar/293a56bef971ab4999d6230491957d33"
				/>
			</ULink>
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
	</DFooter>
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

const socials = await queryCollection('socials').all();
</script>
