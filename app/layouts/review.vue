<template>
	<main class="flex flex-col min-h-dvh max-w-5xl mx-auto">
		<UContainer class="grow prose dark:prose-invert">
			<slot />
		</UContainer>
		<DiscussionList
		category="Movies"/>
	</main>
</template>
