<template>
	<UContainer class="flex flex-col">
		<div class="flex grow">
			<slot />
		</div>
		<USeparator class="my-2" />
		<ReviewDiscussion
			category="Shows"
		/>
	</UContainer>
</template>

<script setup lang="ts">

</script>
