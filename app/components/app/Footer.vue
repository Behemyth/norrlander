<template>
	<footer class="w-full max-w-5xl mx-auto p-4 bg-white shadow dark:bg-gray-900">
		<div class="flex items-center justify-between">
			<ULink
				to="/contact"
				rel="author"
				class="flex items-center"
			>
				<NuxtPicture
					src="/gravatar/avatar/293a56bef971ab4999d6230491957d33"
					:img-attrs="{ class: 'rounded-full' }"
					class="h-12 aspect-square mr-3"
				/>
				<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{{ $t('Contact')
				}}</span>
			</ULink>

			<UHorizontalNavigation :links="links" />

			<SocialIcons :socials="socials ? socials : []" />
		</div>
		<hr class="my-4 border-gray-200 sm:mx-auto dark:border-gray-700">
		<div class="flex items-center justify-between">
			<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Copyright &copy; {{ new
				Date().getFullYear() }}</span>
			<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Film data from TMDb.</span>
			<LanguageSwitch />
			<span class="flex text-sm text-gray-500 sm:justify-center">Made with ❤️ by Asher and Ola</span>
		</div>
	</footer>
</template>

<script setup lang="ts">
const navigation = await fetchContentNavigation(queryContent().where({ footer: true }));

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
