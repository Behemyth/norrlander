<template>
	<UContainer>
		<DPage>
			<div class="flex flex-col grow">
				<slot />
			</div>

			<template #left>
				<DPageAside>
					<DContentSectionList
						v-if="page"
						:toc="page.body.toc!"
					/>
				</DPageAside>
			</template>
		</DPage>
	</UContainer>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('content').path(route.path).first();
});
</script>
