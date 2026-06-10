/**
 * Responsive image preloading helpers.
 *
 * NuxtImg's `preload` prop emits a non-responsive preload link (missing
 * `imagesrcset`) for width-descriptor srcsets, so the browser always fetches
 * the largest variant. Fixed upstream after v2.0.0; these helpers can be
 * replaced with the native `preload` prop once the fix is released.
 */

interface ResponsiveImageSource {
	src: string;
	/** Breakpoint-prefixed sizes string (every vw entry needs a prefix, see nuxt/image#1433). */
	sizes?: string;
	/** Name of a preset from `image.presets` in nuxt.config. */
	preset?: string;
}

/**
 * Emit a responsive `<link rel="preload">` for an above-the-fold image (LCP).
 */
export function useImagePreload(
	src: string | undefined,
	options: Omit<ResponsiveImageSource, 'src'> & { fetchPriority?: 'high' | 'low' | 'auto' } = {},
) {
	if (!import.meta.server || !src) {
		return;
	}
	const img = useImage();
	const { srcset, sizes } = img.getSizes(src, { sizes: options.sizes, preset: options.preset });
	if (!srcset) {
		return;
	}
	useHead({
		link: [{
			rel: 'preload',
			as: 'image',
			fetchpriority: options.fetchPriority ?? 'high',
			imagesrcset: srcset,
			...(sizes && { imagesizes: sizes }),
		}],
	});
}

/**
 * Warm the HTTP cache for interaction-gated images (lightbox variants,
 * offscreen carousel slides) without competing with the critical path:
 * waits for hydration plus an idle frame, then issues low-priority
 * responsive fetches. Skipped when the client requests reduced data usage.
 */
export function useImagePrefetch(sources: () => ResponsiveImageSource[]) {
	if (import.meta.server) {
		return;
	}
	const img = useImage();
	onNuxtReady(() => {
		const { connection } = navigator as Navigator & { connection?: { saveData?: boolean } };
		if (connection?.saveData) {
			return;
		}
		const idle = window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 1500));
		idle(() => {
			for (const source of sources()) {
				const { srcset, sizes } = img.getSizes(source.src, { sizes: source.sizes, preset: source.preset });
				if (!srcset) {
					continue;
				}
				const el = new Image();
				el.fetchPriority = 'low';
				el.decoding = 'async';
				if (sizes) {
					el.sizes = sizes;
				}
				el.srcset = srcset;
			}
		});
	});
}
