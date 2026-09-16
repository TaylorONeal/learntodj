import { test, expect } from '@playwright/test';
import { genres } from '../../src/data/genres';

test('practice loop, reload, rewards, and return home', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('link', { name: /Start a 2-minute challenge/ }).click();
  await page.getByRole('button', { name: 'Start practice' }).click();
  await page.getByRole('button', { name: /At the start of a musical phrase/ }).click();
  await expect(page.getByRole('status')).toContainText('That’s it.');
  await page.getByRole('button', { name: 'Next question' }).click();
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('bass sounds muddy');
  await page.getByRole('button', { name: /Boost both LOW/ }).click();
  await expect(page.getByRole('status')).toContainText('Good moment to learn.');
  await page.getByRole('button', { name: 'Next question' }).click();
  await page.getByRole('button', { name: /9A/ }).click();
  await page.getByRole('button', { name: 'See my results' }).click();
  await expect(page.getByText('2 of 3 correct')).toBeVisible();
  await expect(page.getByText('40 XP', { exact: true })).toBeVisible();
  await expect(page.getByText(/XP reflects correct quiz answers, not live mixing skill/)).toBeVisible();
  await expect(page.getByText(/2 of 9 concepts recalled correctly/)).toBeVisible();
  await page.getByRole('link', { name: 'Done for now' }).click();
  await expect(page.getByText(/40 XP · 2\/9 recalled/)).toBeVisible();
  expect(errors).toEqual([]);
});

test('search, favorites, and persistent checklist', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('searchbox').fill('   house   ');
  await expect(page.getByRole('link', { name: /Tech House/ })).toBeVisible();
  await page.getByRole('searchbox').fill('no-matching-genre');
  await expect(page.getByText('No genres match your search')).toBeVisible();
  await page.getByRole('button', { name: 'Clear search' }).click();
  await page.getByRole('button', { name: 'Favorite House', exact: true }).click();
  await page.getByRole('button', { name: 'Show favorite genres' }).click();
  await expect(page.getByRole('link', { name: 'Open House practice guide', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open Tech House practice guide', exact: true })).toHaveCount(0);
  await page.getByRole('link', { name: 'Open House practice guide', exact: true }).click();
  const item = page.locator('button.checklist-item').first();
  await item.click();
  await expect(item).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(page.locator('button.checklist-item').first()).toHaveAttribute('aria-pressed', 'true');
});

test('all routes render without horizontal overflow or runtime errors', async ({ page }) => {
  test.setTimeout(90_000); // This case visits every lesson and all genre guides.
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const route of ['/', '/practice', '/intro', '/intro/prep', '/intro/playing', '/intro/flows', '/intro/effects', '/intro/remixes', '/intro/devices', ...genres.map(genre => `/genre/${genre.id}`), '/genre/missing', '/missing']) {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1, h2').first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), route).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('malformed and unavailable storage do not crash the app', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('dj-flow-guide-checklists', 'null');
    localStorage.setItem('dj-flow-guide-favorites', '{}');
    localStorage.setItem('learntodj-practice-v1', '{"active":false}');
    Storage.prototype.setItem = () => { throw new Error('Storage unavailable'); };
  });
  await page.goto('/genre/house');
  await page.locator('button.checklist-item').first().click();
  await expect(page.locator('button.checklist-item').first()).toHaveAttribute('aria-pressed', 'true');
  await page.goto('/practice');
  await page.getByRole('button', { name: 'Start practice' }).click();
  await expect(page.getByRole('status')).toContainText('could not save');
});


test('loaded app supports offline practice and guide navigation', async ({ page, context }) => {
  await page.goto('/');
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload();
  await context.setOffline(true);
  await page.getByRole('link', { name: /Start a 2-minute challenge/ }).click();
  await page.getByRole('button', { name: 'Start practice' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('next track is cued');
  await page.getByRole('link', { name: '← Home' }).click();
  await page.getByRole('link', { name: 'Open House practice guide', exact: true }).click();
  await expect(page.locator('button.checklist-item').first()).toBeVisible();
  await context.setOffline(false);
});


test('Android web supports a cold offline route navigation', async ({ page, context, browserName }) => {
  test.skip(browserName !== 'chromium', 'WebKit offline hard navigation needs physical Safari verification.');
  await page.goto('/');
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload();
  await context.setOffline(true);
  await page.goto('/genre/house');
  await expect(page.locator('button.checklist-item').first()).toBeVisible();
});
