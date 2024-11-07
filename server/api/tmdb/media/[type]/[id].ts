export default defineEventHandler(async (event) => {
	const type = getRouterParam(event, 'type')
	const id = getRouterParam(event, 'id')
	const config = useRuntimeConfig(event)

	if (!config.apiSecret) { throw new Error('TMDB API key is missing') }
	if (!config.public.apiBase) { throw new Error('TMDB API URL is missing') }

	return await $fetch(`/${type}/${id}`, {
		baseURL: `${config.public.apiBase}`,
		params: {
			language: 'en-US'
		},
		headers: {
			Authorization: `Bearer ${config.apiSecret}`
		}
	})
})
