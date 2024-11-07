import type { UseFetchOptions } from 'nuxt/app'

export function useTMDB<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>,
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$tmdbAPI as typeof $fetch
  })
}
