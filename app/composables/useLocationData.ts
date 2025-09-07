/**
 * Shared composable for location data.
 */
export const useLocationData = () =>
	useAsyncData('location', () => queryCollection('locations').all());

export const useCurrentLocationData = () =>
	useAsyncData('location', () => queryCollection('locations').where('end_year', 'IS NULL').first());
