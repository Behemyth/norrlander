<template>
	<footer class="w-full max-w-5xl mx-auto p-4 bg-white shadow dark:bg-gray-900">
		<div class="flex flex-wrap flex-row items-center justify-between">
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
				<UHorizontalNavigation
					:links="links"
				/>
			</div>
			<SocialIcons :socials="socials ? socials : []" />
		</div>
		<hr class="my-4 border-gray-200 sm:mx-auto dark:border-gray-700">
		<div class="flex flex-wrap flex-row items-center justify-between">
			<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Copyright &copy; {{ new
				Date().getFullYear() }}</span>

			<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Film data from TMDb.</span>
			<LanguageSwitch />
			<span class="flex text-sm text-gray-500 sm:justify-center">Made with ❤️ by Asher and Ola</span>
		</div>
	</footer>
</template>

<script setup lang="ts">
const navigation = await queryCollectionNavigation(queryContent().where({ footer: true }));

const links = computed(() => {
	return navigation.map((link) => {
		return {
			label: link.navTitle || link.title,
			to: link._path,
		};
	});
});

const { data: socials } = useLazyAsyncData('socials', () =>
	queryContent<MetaData>('_data')
		.where({ _partial: true, title: 'Metadata' })
		.findOne().then((value) => {
			return value.socials;
		}),
);
</script>
