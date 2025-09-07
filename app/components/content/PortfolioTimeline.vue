<template>
	<UPageList>
		<CareerCard
			v-for="item in items"
			:key="item.path"
			:job="item"
		/>
	</UPageList>
</template>

<script setup lang="ts">
const items = await queryCollection('career')
	.order('start_date', 'DESC')
	.all();
</script>
