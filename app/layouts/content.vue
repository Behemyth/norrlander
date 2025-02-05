<template>
	<UContainer>
		<DPage>
			<div class="flex flex-col grow">
				<slot />
			</div>

			<template #left>
				<DPageAside>
					<DContentSectionList :toc="page.body.toc!" />
				</DPageAside>
			</template>
		</DPage>
	</UContainer>
</template>

<script setup lang="ts">
const route = useRoute();

const page = await queryCollection('page').path(route.path).first();
</script>
