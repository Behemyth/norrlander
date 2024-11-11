<template>
	<main class="flex flex-col w-full">
		<article class="grow prose dark:prose-invert">
			<slot />
		</article>
		<DiscussionList
			category="Movies"
		/>
	</main>
</template>
