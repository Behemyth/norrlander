export default defineNuxtPlugin((nuxtApp) => {

	const config = nuxtApp.$config

	if (!config.apiSecret) { throw new Error('TMDB API key is missing') }

	const tmdbAPI = $fetch.create({
		baseURL: `https://api.themoviedb.org/3`,
		params: {
			language: 'en-US'
		},
		headers: {
			Authorization: `Bearer ${config.apiSecret}`
		}

	})

	// Expose to useNuxtApp().$tmdbAPI
	return {
		provide: {
			tmdbAPI
		}
	  }
  })
