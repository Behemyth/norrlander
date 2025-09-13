<template>
	<UPageHero
		title="The Norrlander"
		headline="Asher Norland"
		:links="links"
	/>
</template>

<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui';

const links: ButtonProps[] = [
	{
		label: 'Read Blog',
		to: '/blog',
		size: 'lg',
		variant: 'ghost',
	},
	{
		label: 'View Photography',
		to: '/photography',
		size: 'lg',
		variant: 'ghost',
	},
	{
		label: 'View Portfolio',
		to: '/portfolio',
		size: 'lg',
		variant: 'ghost',
	},
	{
		label: 'Read Reviews',
		to: '/review',
		size: 'lg',
		variant: 'ghost',
	},
];

useSeoMeta({
	title: 'The Norrlander',
	description: 'Personal website of Asher Norland - Blog, Portfolio, Photography, and Reviews',

});
</script>
