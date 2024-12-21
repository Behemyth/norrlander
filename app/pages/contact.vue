<template>
	<div>
		<h1>Contact</h1>
	</div>
	<div class="not-prose flex space-x-6">
		<ULink
			v-for="contact in contacts"
			:key="contact.name"
			:to="contact.link"
			:title="contact.name"
		>
			<UIcon
				:name="contact.icon"
				class="w-12 h-12"
			/>
		</ULink>
	</div>
</template>
