import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  use: { baseURL: 'http://127.0.0.1:4187', trace: 'retain-on-failure' },
  projects: [
    { name: 'android-web', use: { ...devices['Pixel 7'] } },
    { name: 'iphone-web', use: { ...devices['iPhone 13'], defaultBrowserType: 'webkit' } },
  ],
  webServer: { timeout: 180_000, command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4187', url: 'http://127.0.0.1:4187', reuseExistingServer: false },
});
