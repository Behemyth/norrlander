<template>
	<div class="flex space-x-6">
		<ULink v-for="social in props.socials" :key="social.name" :to="social.link" :title="social.name">
			<UIcon :name="social.icon" class="shrink-0 w-6 h-6 align-middle text-gray-900 dark:text-gray-300" />
		</ULink>
	</div>
</template>

<script setup lang="ts">

const props = defineProps({
	socials: {
		type: Array<SocialMetaData>,
		required: true
	}
})

</script>
