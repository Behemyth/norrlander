/**
 * Shared composable for location data.
 */
export const useLocationData = () =>
	useAsyncData('locations-all', () => queryCollection('locations').all());

export const useCurrentLocationData = () =>
	useAsyncData('location-current', () => queryCollection('locations').where('end_year', 'IS NULL').first());
