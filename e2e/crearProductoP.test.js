describe('Crear producto screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('"3 campos" should be visible', async () => {
    await expect(element(by.id('CrearProductoP.SeleccionarProducto'))).toBeVisible();
 await expect(element(by.id('CrearProductoP.FechaLimite'))).toBeVisible();
 await expect(element(by.id('CrearProductoP.UploadImage'))).toBeVisible();
  });

  it('"Continuar" button should be visible', async () => {
    await expect(element(by.id('CrearProductoP.Button'))).toBeVisible();
  });
});
