import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

describe('shipped brand assets', () => {
  it.each([
    ['public/pwa-192x192.png', 192, 192],
    ['public/pwa-512x512.png', 512, 512],
    ['public/apple-touch-icon.png', 180, 180],
    ['public/social-card.png', 1200, 630],
    ['ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png', 1024, 1024],
  ])('%s is a correctly sized PNG', async (path, width, height) => {
    const metadata = await sharp(path).metadata();
    expect(metadata.format).toBe('png');
    if (path.startsWith('ios/')) expect(metadata.hasAlpha).toBe(false);
    expect([metadata.width, metadata.height]).toEqual([width, height]);
  });

  it('provides a real multi-resolution ICO fallback', async () => {
    const icon = await readFile('public/favicon.ico');
    expect(icon.readUInt16LE(2)).toBe(1);
    expect(icon.readUInt16LE(4)).toBe(3);
    expect([icon[6], icon[22], icon[38]]).toEqual([16, 32, 48]);
  });
});
