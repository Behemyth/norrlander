<template>
	<main class="flex flex-col grow min-h-fit p-4 max-w-5xl mx-auto prose dark:prose-invert">
		<div class="grow">
			<slot />
		</div>
		<DiscussionList
			category="Movies"
		/>
	</main>
</template>
