<template>
	<UPageCard
		:title="project.title"
		:description="project.description"
		:to="project.path"
		variant="ghost"
	>
		<UTheme
			:ui="{
				pageFeature: {
					description: 'text-sm truncate',
				},
			}"
		>
			<UPageList>
				<UPageFeature
					v-if="project.link"
					:icon="linkIcon"
					:description="linkLabel"
				/>
			</UPageList>
		</UTheme>
	</UPageCard>
</template>

<script setup lang="ts">
interface Props {
	project: {
		title: string;
		description: string;
		path: string;
		link: string;
	};
}

const { project } = defineProps<Props>();

const parsedLink = computed(() => {
	try {
		return new URL(project.link);
	}
	catch {
		return null;
	}
});

const isGithub = computed(() => parsedLink.value?.hostname.endsWith('github.com') ?? false);

const linkIcon = computed(() => (isGithub.value ? 'i-mdi-github' : 'i-mdi-link-variant'));

const linkLabel = computed(() => {
	const url = parsedLink.value;
	if (!url) return project.link;
	const segments = url.pathname.split('/').filter(Boolean);
	if (isGithub.value && segments.length >= 2) {
		return `${segments[0]}/${segments[1]}`;
	}
	const trimmedPath = segments.join('/');
	return trimmedPath ? `${url.hostname}/${trimmedPath}` : url.hostname;
});
</script>
