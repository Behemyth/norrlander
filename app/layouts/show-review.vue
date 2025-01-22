<template>
	<UContainer class="flex">
		<DPage>
			<div class="flex grow">
				<slot />
			</div>
			<USeparator class="my-2" />
			<ReviewDiscussion
				category="Shows"
			/>

			<template #right>
				<DPageAside />
			</template>
		</DPage>
	</UContainer>
</template>

<script setup lang="ts">

</script>
