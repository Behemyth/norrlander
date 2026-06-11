/**
 * The lightbox is a zoom-to-inspect surface: browsers never re-evaluate
 * srcset on pinch-zoom, so viewport-based sizing would stay soft when
 * zoomed. Request the image's full intrinsic width instead — IPX never
 * upscales, so this is "maximum size, if supported".
 *
 * Sources are PNGs; without format conversion IPX re-encodes them as
 * full-resolution PNGs (tens of MB). WebP keeps full-res transfers sane.
 */

/** Used when an image's intrinsic width is unknown (2x the largest 2xl screen). */
export const LIGHTBOX_FALLBACK_WIDTH = 3072;

export const LIGHTBOX_FORMAT = 'webp';

export function getLightboxWidth(image: { width?: number }): number {
	return image.width ?? LIGHTBOX_FALLBACK_WIDTH;
}
