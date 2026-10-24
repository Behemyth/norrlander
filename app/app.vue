<template>
	<UApp
		:scroll-body="false"
	>
		<NuxtAnnouncer />
		<AppHeader />
		<UMain class="grow min-h-0">
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</UMain>
		<AppFooter />
	</UApp>
</template>
