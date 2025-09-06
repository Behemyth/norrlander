/**
 * Shared composable for socials data.
 */
export const useSocialsData = () =>
	useAsyncData('socials', () => queryCollection('socials').all());
