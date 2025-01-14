<template>
	<main class="flex flex-col w-full">
		<div class="grow mx-auto w-full">
			<slot />
		</div>
		<USeparator class="my-2" />
		<ReviewDiscussion
			category="Movies"
		/>
	</main>
</template>

<script setup lang="ts">

</script>
