import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'tester12';
    const userPassword = 'password';
    const expectedUsername = 'Jan Demobankowy';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const incorrectUserId = 'tester';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(incorrectUserId);
    await page.getByTestId('password-input').click();
    await page.getByTestId('error-login-id').click();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErrorMessage,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'tester12';
    const incorrectPassword = '1234';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(incorrectPassword);
    await page.getByTestId('password-input').blur();

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMessage,
    );
  });
});
