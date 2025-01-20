<template>
	<UContainer class="flex flex-col">
		<div class="grow mx-auto w-full">
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
