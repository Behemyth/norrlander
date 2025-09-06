/**
 * Shared composable for academic data.
 */
export const useAcademicData = () =>
	useAsyncData('academic', () => queryCollection('academics').all());
