describe('Crear oferta screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('"7 campos" should be visible', async () => {
    await expect(element(by.id('CrearOferta.SeleccionarProducto'))).toBeVisible();
 await expect(element(by.id('CrearOferta.FechaLimite'))).toBeVisible();
 await expect(element(by.id('CrearOferta.InputPU'))).toBeVisible();
 await expect(element(by.id('CrearOferta.InputPI'))).toBeVisible();
 await expect(element(by.id('CrearOferta.InputUMin'))).toBeVisible();
 await expect(element(by.id('CrearOferta.InputUMax'))).toBeVisible();
 await expect(element(by.id('CrearOferta.UploadImage'))).toBeVisible();

  });

  it('"Continuar" button should be visible', async () => {
    await expect(element(by.id('CrearOferta.Button'))).toBeVisible();
  });
});
