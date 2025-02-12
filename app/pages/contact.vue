<template>
	<div>
		<h1 />{{ contactLoc }}
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
const i18n = useI18n();

const contactLoc = computed(() => i18n.t('contact'));

useHead({
	title: contactLoc,
});
</script>
