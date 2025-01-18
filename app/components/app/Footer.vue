<template>
	<DFooter>
		<div class="flex flex-wrap flex-row items-center justify-around">
			<ULink
				to="/"
				rel="author"
				class="px-4"
			>
				<UAvatar
					size="2xl"
					src="https://www.gravatar.com/avatar/293a56bef971ab4999d6230491957d33"
				/>
			</ULink>

			<div class="flex">
				<UNavigationMenu
					:items="items"
					color="neutral"
					variant="link"
				/>
			</div>
			<div class="flex space-x-2 md:space-x-6">
				<ULink
					v-for="social in socials"
					:key="social.name"
					:to="social.link"
					:title="social.name"
				>
					<UIcon
						:name="social.icon"
						class="shrink-0 w-6 h-6 align-middle text-gray-900 dark:text-gray-300"
						color="neutral"
						variant="ghost"
					/>
				</ULink>
			</div>
		</div>
		<hr class="my-4 border-gray-200 sm:mx-auto dark:border-gray-700">
		<div class="flex flex-wrap flex-row items-center justify-around">
			<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Copyright &copy; {{ new
				Date().getFullYear() }}</span>

			<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
				<ULink to="/about#film-data">Film data</ULink>
				<div class="inline" /> from
				<ULink to="https://www.themoviedb.org/">TMDb</ULink>
			</span>
			<AppLanguageSwitch />
			<span class="flex text-sm text-gray-500 sm:justify-center">Made with ❤️ by Asher and Ola</span>
		</div>
	</DFooter>
</template>

<script setup lang="ts">
const i18n = useI18n();

const contactLocalized = computed(() => {
	return i18n.t('Contact');
});

const items = [
	{
		label: 'About',
		to: '/about',
	},
	{
		label: contactLocalized.value,
		to: '/contact',
	},
];

const socials = await queryCollection('socials').all();
</script>
