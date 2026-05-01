<template>
	<UPage>
		<template #left>
			<UPageAside class="hidden lg:block">
				<AppProfileCard
					orientation="vertical"
					variant="ghost"
					footer
				/>
			</UPageAside>
		</template>
		<UPageHeader
			:title="$t('contactPage.title')"
			:description="$t('contactPage.description')"
		/>
		<UPageBody>
			<UPageColumns>
				<AppProfileCard
					orientation="horizontal"
					class="lg:hidden"
					footer
				/>
				<UPageCard
					:title="$t('contact')"
					:description="$t('contactPage.useResponsibly')"
				>
					<UPageList divide>
						<UPageFeature
							v-for="(info, index) in contact"
							:key="index"
							class="px-3 py-4"
							variant="ghost"
							:title="info.name"
							:icon="info.icon"
							:to="info.link"
							target="_blank"
							:description="info.description"
						/>
					</UPageList>
				</UPageCard>
				<UPageCard
					:title="$t('contactPage.socials')"
					:description="$t('contactPage.socialsDescription')"
				>
					<UPageList divide>
						<UPageFeature
							v-for="(social, index) in socials"
							:key="index"
							class="px-3 py-4"
							variant="ghost"
							:title="social.name"
							:icon="social.icon"
							:to="social.link"
							target="_blank"
							:description="social.description"
						/>
					</UPageList>
				</UPageCard>
			</UPageColumns>
		</UPageBody>
	</UPage>
</template>

<script lang="ts" setup>
const [{ data: contact }, { data: socials }] = await Promise.all([
	useContactData(),
	useSocialsData(),
]);

definePageMeta({
	layout: 'default',
});

useSeoMeta({
	title: 'Contact',
	description: 'Asher Norland\'s contact information.',
	ogTitle: 'Asher Norland - Contact Information',
	ogDescription: 'Say hello, and I might just say hello back.',
});
</script>
