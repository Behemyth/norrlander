<template>
	<UContainer class="flex flex-col max-w-4xl">
		<div class="flex grow">
			<slot />
		</div>
		<USeparator class="my-2" />
		<ReviewDiscussion
			category="Movies"
		/>
	</UContainer>
</template>

<script setup lang="ts">

</script>
