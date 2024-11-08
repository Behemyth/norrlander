<template>
	<div class="not-prose flex space-x-6">
		<ULink v-for="contact in contacts" :key="contact.name" :to="contact.link" :title="contact.name">
			<UIcon :name="contact.icon" class="w-12 h-12" />
		</ULink>
	</div>
</template>

<script setup lang="ts">

// queryContent() is wrapped with useAsyncData() to prevent query duplication
const { data: contacts } = useAsyncData('contacts', () =>
	queryContent<MetaData>('_data')
		.where({ _partial: true, title: 'Metadata' })
		.findOne().then((value) => {
			return value.contacts
		})
)

</script>
