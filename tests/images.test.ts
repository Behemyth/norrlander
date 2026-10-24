import { createIPX } from 'ipx';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

describe('lightbox images', () => {
	it.each([
		{ width: 5600, height: 40 },
		{ width: 40, height: 4200 },
	])('preserves $width x $height source dimensions without content metadata', async ({ width, height }) => {
		const source = await sharp({
			create: { width, height, channels: 3, background: '#123456' },
		}).png().toBuffer();
		const ipx = createIPX({
			storage: {
				name: 'memory',
				getMeta: () => ({}),
				getData: () => source,
			},
		});

		const result = await ipx('photo.png', { format: 'webp' }).process();
		const metadata = await sharp(result.data).metadata();

		expect(metadata).toMatchObject({ width, height, format: 'webp' });
	});
});
