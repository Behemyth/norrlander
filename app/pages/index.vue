<template>
	<UPageHero
		title="The Norrlander"
		:links="links"
	/>
</template>

<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui';

const links: ButtonProps[] = [
	{
		label: 'View Portfolio',
		to: '/portfolio',
		size: 'lg',
		variant: 'ghost',
	},
	{
		label: 'Read Blog',
		to: '/blog',
		size: 'lg',
		variant: 'ghost',
	},
];

useSeoMeta({
	title: 'The Norrlander',
	description: 'Personal website of Asher Norland - Graphics Engineer showcasing portfolio, blog, and reviews',

});
</script>
