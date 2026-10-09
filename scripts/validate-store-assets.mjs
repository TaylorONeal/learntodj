import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const directory = resolve(root, 'assets/store/android');
const manifest = JSON.parse(await readFile(resolve(directory, 'mobile-web-drafts/capture-manifest.json'), 'utf8'));
assert.match(manifest.status, /MOBILE-WEB DRAFTS/);
assert.equal(manifest.captures.length, 6);
assert.deepEqual(manifest.errors, []);
assert.deepEqual(manifest.externalRequests, []);
for (const [file, width, height, alpha] of [
  [resolve(directory, 'feature-graphic.png'), 1024, 500, false],
  [resolve(root, 'public/favicon.png'), 512, 512, true],
  ...manifest.captures.map(capture => [resolve(directory, 'mobile-web-drafts', capture.file), 1080, 1920, false]),
]) {
  const metadata = await sharp(file).metadata();
  assert.equal(metadata.format, 'png', file);
  assert.deepEqual([metadata.width, metadata.height, metadata.hasAlpha], [width, height, alpha], file);
}
assert((await stat(resolve(root, 'public/favicon.png'))).size < 1024 * 1024);
const packet = await readFile(resolve(root, 'docs/store-packet.md'), 'utf8');
const short = packet.match(/\*\*Short description:\*\* (.+)/)?.[1];
assert(short && short.length <= 80);
const description = packet.split('**Full description:**\n\n')[1].split('\n\nPublisher name,')[0];
assert(description.length <= 4000);
console.log(`Validated 6 draft screenshots, RGB feature graphic, reused 512px icon; short description ${short.length}/80 and full description ${description.length}/4000 characters.`);
