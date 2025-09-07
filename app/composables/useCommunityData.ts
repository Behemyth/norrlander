/**
 * Shared composable for community data.
 */
export const useCommunityData = () =>
	useAsyncData('community', () => queryCollection('communities').all());
