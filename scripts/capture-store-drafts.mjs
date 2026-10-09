import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../', import.meta.url));
const origin = process.env.STORE_PREVIEW_URL || 'http://127.0.0.1:4193';
if (!['127.0.0.1', 'localhost'].includes(new URL(origin).hostname)) throw new Error('Capture must use a local preview.');
const output = resolve(root, 'assets/store/android/mobile-web-drafts');
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
const externalRequests = new Set();
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('request', request => { if (!request.url().startsWith(origin) && /^https?:/.test(request.url())) externalRequests.add(request.url()); });
const captures = [];
async function capture(file, description) {
  await page.mouse.move(0, 0);
  await page.evaluate(() => document.fonts.ready);
  // Let the existing entrance animation finish; never alter UI or storage for a capture.
  await page.waitForTimeout(800);
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Horizontal overflow');
  await page.screenshot({ path: resolve(output, file) });
  captures.push({ file, description, route: new URL(page.url()).pathname });
}
try {
  await page.goto(origin, { waitUntil: 'networkidle' });
  await capture('01-start.png', 'Fresh session: zero XP, entry to short practice and preparation guides.');
  await page.getByRole('link', { name: /Start a 2-minute challenge/ }).click();
  await page.getByRole('button', { name: 'Start practice' }).click();
  await capture('02-question.png', 'First real practice question, before an answer is chosen.');
  await page.getByRole('button', { name: /At the start of a musical phrase/ }).click();
  await capture('03-explanation.png', 'Correct answer and the app’s phrasing explanation; 20 XP earned by this interaction.');
  await page.getByRole('button', { name: 'Next question' }).click();
  await page.getByRole('button', { name: /Swap the bass/ }).click();
  await page.getByRole('button', { name: 'Next question' }).click();
  await page.getByRole('button', { name: /9A/ }).click();
  await page.getByRole('button', { name: 'See my results' }).click();
  await page.getByText('3 of 3 correct', { exact: true }).waitFor();
  await capture('04-round-results.png', 'Three answers completed through UI: 3 of 3 correct and 60 XP; demonstration session, not a user testimonial.');
  await page.getByRole('link', { name: 'Try it on your decks: House guide' }).click();
  await page.locator('button.checklist-item').first().click();
  assert.equal(await page.locator('button.checklist-item').first().getAttribute('aria-pressed'), 'true');
  await page.locator('button.checklist-item').first().evaluate(element => element.scrollIntoView({ block: 'center' }));
  await capture('05-house-checklist.png', 'House preparation checklist with one item checked through UI.');
  await page.goto(origin + '/intro/flows', { waitUntil: 'networkidle' });
  await capture('06-track-flow.png', 'Actual track-flow lesson showing musical structure.');
  assert.deepEqual(errors, []);
  assert.deepEqual([...externalRequests], []);
  await writeFile(resolve(output, 'capture-manifest.json'), JSON.stringify({
    status: 'MOBILE-WEB DRAFTS — not installed Android screenshots; recapture on approved native build before store submission.',
    capturedAt: new Date().toISOString(), engine: 'Playwright Chromium', viewport: { width: 540, height: 960 }, pixelSize: { width: 1080, height: 1920 },
    method: 'Fresh isolated browser context; UI interactions only; no injected progress, modified UI, overlays, or device frames.',
    errors, externalRequests: [...externalRequests], captures,
  }, null, 2) + '\n');
  console.log('Captured six genuine mobile-web draft flows; no console errors, overflow, or external requests.');
} finally { await browser.close(); }
