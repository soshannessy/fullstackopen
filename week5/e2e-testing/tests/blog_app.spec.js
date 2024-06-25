import { loginWith } from './helper';
import { test, expect, beforeEach, describe } from '@playwright/test';

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset'); 
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'E2E Test',
        username: 'E2ETest',
        password: 'e2etest'
      }
    });
    await page.goto('http://localhost:5173');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  describe('Login', () => {
    test('success with valid credentials', async ({ page }) => {
      await loginWith(page, 'E2ETest', 'e2etest');
      await expect(page.getByText('E2ETest logged-in')).toBeVisible();
    });

    test('Fails with invalid credentials', async ({ page }) => {
      await loginWith(page, 'E2ET', 'e2test');
      await expect(page.getByText('Invalid username or password')).toBeVisible();
    });
  });
});

describe('Logged in user', () => {
  beforeEach(async ({ page }) => {
    await loginWith(page, 'E2ETest', 'e2etest');
  })
  test('adds a blog', async ({ page }) => {

  })
})