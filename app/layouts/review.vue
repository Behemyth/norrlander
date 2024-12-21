<template>
	<main class="flex flex-col w-full">
		<ReviewHeader />
		<article class="grow mx-auto w-full">
			<slot />
		</article>
		<DiscussionList
			category="Movies"
		/>
	</main>
</template>

<script setup lang="ts">

</script>
