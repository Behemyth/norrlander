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
		<UPageBody>
			<UPageColumns>
				<AppProfileCard
					orientation="horizontal"
					class="lg:hidden"
					footer
				/>
				<UPageCard
					:title="$t('contact')"
					description="Use responsibly"
				>
					<UPageList divide>
						<UPageFeature
							v-for="(info, index) in contact"
							:key="index"
							class="m-2"
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
					title="Socials"
					description="Here I dabble"
				>
					<UPageList divide>
						<UPageFeature
							v-for="(social, index) in socials"
							:key="index"
							class="m-2"
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
const { data: contact } = await useContactData();
const { data: socials } = await useSocialsData();

definePageMeta({
	layout: 'default',
});
</script>
