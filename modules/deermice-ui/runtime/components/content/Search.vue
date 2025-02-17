<template>
	<UModal
		v-model:open="open"
		:class="theme.modal({ class: ui?.modal })"
	>
		<slot />

		<template #content>
			<UCommandPalette
				placeholder="Search..."
				icon="i-mdi-search"
				autofocus
				close
				:groups="groups"
				:fuse="useFuseOptions"
				:class="theme.commandPalette({ class: ui?.commandPalette })"
				@update:model-value="onSelect"
				@update:open="open = $event"
			/>
		</template>
	</UModal>
</template>

<script lang="ts">
import type { CommandPaletteGroup, CommandPaletteItem } from '@nuxt/ui';
import { ref } from 'vue';
import type { PartialString } from '@nuxt/ui/runtime/types/utils.js';
import { tv } from 'tailwind-variants';

const baseTheme = tv({
	slots: {
		modal: '',
		commandPalette: 'flex-1',
	},
});

export interface ContentSearchProps {

	// The groups of items to search as defined by 'UCommandPalette'
	groups?: CommandPaletteGroup<CommandPaletteItem>[];

	// The UI configuration overrides.
	ui?: PartialString<typeof baseTheme.slots>;
};

export interface ContentSearchSlots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
const open = ref(false);

const router = useRouter();

function onSelect(item: CommandPaletteItem) {
	if (item.to) {
		router.push(item.to);
	}
	open.value = false;
}

// From an implicit dependency containing `useFuse`
const useFuseOptions = {
	fuseOptions: {
		includeMatches: false,
	},
	resultLimit: 10,
	matchAllWhenSearchEmpty: false,
};

withDefaults(defineProps<ContentSearchProps>(),
	{
		groups: () => [],
	},
);

defineSlots<ContentSearchSlots>();

const theme = baseTheme();
</script>
