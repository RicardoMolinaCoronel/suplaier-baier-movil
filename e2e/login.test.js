describe('Home screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('"Login" button should be visible', async () => {
    await expect(element(by.id('LoginPage.LoginButton'))).toBeVisible();
  });

  it('"Login" button should be visible', async () => {
    await expect(element(by.id('LoginPage.RegisterButton'))).toBeVisible();
  });
  it('should login successfully', async () => {
    await element(by.id('LoginPage.InputUser')).typeText('kduran');
    await element(by.id('LoginPage.InputPassword')).typeText('kduran1234');

    const loginButton = element(by.text('LoginPage.LoginButton'));
    await loginButton.tap();

    await expect(loginButton).not.toExist();
    await expect(element(by.id('SplashScreen'))).toBeVisible();
  });
});
