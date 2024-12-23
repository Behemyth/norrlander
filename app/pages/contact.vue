<template>
	<div>
		<h1>Contact</h1>
		<div class="flex space-x-6">
			<ULink
				v-for="contact in contacts"
				:key="contact.id"
				:to="contact.link"
				:title="contact.name"
			>
				<UIcon
					:name="contact.icon"
					class="w-12 h-12"
					color="neutral"
					variant="ghost"
				/>
			</ULink>
		</div>
	</div>
</template>

<script setup lang="ts">
const contacts = await queryCollection('contact').all();

useSeoMeta({
	title: 'Contact',
});
</script>
