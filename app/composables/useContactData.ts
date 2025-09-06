/**
 * Shared composable for contact data.
 */
export const useContactData = () =>
	useAsyncData('contact', () => queryCollection('contact').all());
