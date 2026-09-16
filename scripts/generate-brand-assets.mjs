import { readFile, writeFile, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const icon = await readFile(resolve(root, 'assets/brand/icon.svg'), 'utf8');
const foreground = icon.replace(/<rect data-background="true"[^>]*\/>/, '');
const source = Buffer.from(icon);
const exportPng = (svg, width, height, destination) => sharp(svg).resize(width, height).png().toFile(resolve(root, destination));

await exportPng(source, 512, 512, 'public/favicon.png');
await exportPng(source, 192, 192, 'public/pwa-192x192.png');
await exportPng(source, 512, 512, 'public/pwa-512x512.png');
await exportPng(source, 180, 180, 'public/apple-touch-icon.png');
await exportPng(await readFile(resolve(root, 'assets/brand/social-card.svg')), 1200, 630, 'public/social-card.png');
await writeFile(resolve(root, 'public/favicon.svg'), icon);
await sharp(await readFile(resolve(root, 'assets/brand/play-feature.svg')))
  .removeAlpha().png().toFile(resolve(root, 'assets/store/android/feature-graphic.png'));

// ICO directory with embedded PNGs, so legacy /favicon.ico requests use our mark too.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map(size => sharp(source).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
for (let i = 0; i < sizes.length; i++) {
  const entry = 6 + i * 16;
  header[entry] = sizes[i]; header[entry + 1] = sizes[i];
  header.writeUInt16LE(1, entry + 4); header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(pngs[i].length, entry + 8); header.writeUInt32LE(offset, entry + 12);
  offset += pngs[i].length;
}
await writeFile(resolve(root, 'public/favicon.ico'), Buffer.concat([header, ...pngs]));

const densities = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
for (const [density, scale] of Object.entries(densities)) {
  const dir = `android/app/src/main/res/mipmap-${density}`;
  for (const name of ['ic_launcher', 'ic_launcher_round']) {
    const size = 48 * scale;
    const shape = name === 'ic_launcher_round'
      ? '<circle cx="256" cy="256" r="244" fill="white"/>'
      : '<rect x="12" y="12" width="488" height="488" rx="96" fill="white"/>';
    const mask = await sharp(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">' + shape + '</svg>')).resize(size, size).png().toBuffer();
    await sharp(source).resize(size, size).composite([{ input: mask, blend: 'dest-in' }]).png()
      .toFile(resolve(root, dir, name + '.png'));
  }
  // Adaptive foreground uses a 108dp canvas. The mark fits the central safe region.
  await exportPng(Buffer.from(foreground), 108 * scale, 108 * scale, `${dir}/ic_launcher_foreground.png`);
}
// App Store icons must not contain an alpha channel.
await sharp(source).resize(1024, 1024).removeAlpha().png()
  .toFile(resolve(root, 'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png'));

// Keep platform-specific launch image dimensions while replacing all starter artwork.
async function replaceSplash(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await replaceSplash(path);
    else if (/^splash.*\.png$/.test(entry.name)) {
      const { width, height } = await sharp(path).metadata();
      const size = Math.round(Math.min(width, height) * .3);
      const mark = await sharp(source).resize(size, size).png().toBuffer();
      // Render to memory before overwriting the old image file.
      const output = await sharp({ create: { width, height, channels: 3, background: '#061116' } })
        .composite([{ input: mark, gravity: 'center' }]).png().toBuffer();
      await writeFile(path, output);
    }
  }
}
await replaceSplash(resolve(root, 'android/app/src/main/res'));
await replaceSplash(resolve(root, 'ios/App/App/Assets.xcassets/Splash.imageset'));
console.log('Exported local web, PWA, Android, and iOS brand assets.');
