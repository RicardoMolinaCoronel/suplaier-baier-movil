describe('Crear demanda screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('"7 campos" should be visible', async () => {
    await expect(element(by.id('CrearDemanda.SeleccionarProducto'))).toBeVisible();
 await expect(element(by.id('CrearDemanda.FechaLimite'))).toBeVisible();
 await expect(element(by.id('CrearDemanda.InputPU'))).toBeVisible();
 await expect(element(by.id('CrearDemanda.InputPI'))).toBeVisible();
 await expect(element(by.id('CrearDemanda.InputUMin'))).toBeVisible();
 await expect(element(by.id('CrearDemanda.InputUMax'))).toBeVisible();
  });

  it('"Continuar" button should be visible', async () => {
    await expect(element(by.id('CrearDemanda.Button'))).toBeVisible();
  });
});
