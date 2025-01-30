<template>
	<UContainer>
		<DPage>
			<div class="flex flex-col grow">
				<slot />
			</div>

			<template #left>
				<DPageAside>
					<DContentSectionList :toc="$attrs.toc as Toc" />
				</DPageAside>
			</template>
		</DPage>
	</UContainer>
</template>

<script setup lang="ts">
import type { Toc } from '@nuxt/content';
</script>
