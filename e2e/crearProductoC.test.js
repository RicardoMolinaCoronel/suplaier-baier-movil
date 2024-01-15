describe('Crear producto comprador screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('"3 campos" should be visible', async () => {
    await expect(element(by.id('CrearProductoC.SeleccionarProducto'))).toBeVisible();
 await expect(element(by.id('CrearProductoC.FechaLimite'))).toBeVisible();
 await expect(element(by.id('CrearProductoC.UploadImage'))).toBeVisible();
  });

  it('"Continuar" button should be visible', async () => {
    await expect(element(by.id('CrearProductoC.Button'))).toBeVisible();
  });
});
