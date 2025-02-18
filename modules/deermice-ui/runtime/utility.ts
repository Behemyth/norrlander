import type { ContentNavigationItem } from '@nuxt/content';
import type { NavigationMenuItem, BreadcrumbItem } from '@nuxt/ui';

/**
 * @brief Takes the data that is given by `queryCollectionNavigation`, a nuxt/content utility,
 * 	and maps it to the type provided by nuxt/ui
 */
export function mapContentNavigation(navigationItems: ContentNavigationItem[] | undefined): NavigationMenuItem[] {
	if (!navigationItems) {
		return [];
	}

	return navigationItems?.map(
		(item): NavigationMenuItem => {
			return {
				label: item.title,
				to: item.path,
			};
		},
	);
};

export function mapContentBreadcrumbs(
	navigationItems: ContentNavigationItem[] | undefined,
	path: string): BreadcrumbItem[] {
	const breadcrumbs: BreadcrumbItem[] = [];

	// Decompose the path into its parts
	const parts = path.split('/').filter(Boolean);
	let currentPath = '';

	// Init the first element
	breadcrumbs.push({
		label: 'Home',
		to: '/',
	});

	if (!navigationItems) {
		return [];
	}

	while (parts.length) {
		// Construct the current path
		currentPath += '/' + parts.shift();

		const item: ContentNavigationItem | undefined = navigationItems?.find(item => item.path === currentPath);

		if (!item) {
			break;
		}

		breadcrumbs.push({
			label: item.title,
			to: item.path,
		});

		navigationItems = item.children;
	}

	return breadcrumbs;
}
