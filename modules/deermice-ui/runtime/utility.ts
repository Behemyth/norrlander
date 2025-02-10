import type { ContentNavigationItem } from '@nuxt/content';
import type { NavigationMenuItem, NavigationMenuChildItem } from '@nuxt/ui';

/**
 * @brief A helper to process children of a navigation item
 */
function mapContentNavigationChildren(children: ContentNavigationItem[] | undefined): NavigationMenuChildItem[] {
	if (!children) {
		return [];
	}

	return children.map(
		(item): NavigationMenuChildItem => {
			return {
				label: item.title,
				to: item.path,
			};
		},
	);
}

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
				children: mapContentNavigationChildren(item.children),
			};
		},
	);
};

export function findBreadcrumbs(navigationItems: ContentNavigationItem[] | undefined, path: string): NavigationMenuItem[] {
	if (!navigationItems) {
		return [];
	}

	const breadcrumbs: NavigationMenuItem[] = [];
	let currentPath = path;

	while (currentPath !== '/') {
		const item = navigationItems.find(item => item.path === currentPath);
		if (!item) {
			break;
		}

		breadcrumbs.unshift({
			label: item.title,
			to: item.path,
		});

		currentPath = item.parentPath as string;
	}

	return breadcrumbs;
}
