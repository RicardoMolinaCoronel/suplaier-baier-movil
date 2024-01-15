describe('Ver perfil screen', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
    });
  
    it('"7 campos" should be visible', async () => {
      await expect(element(by.id('PerfilP.Nombre'))).toBeVisible();
   await expect(element(by.id('Perfil.Correo'))).toBeVisible();
   await expect(element(by.id('Perfil.Direccion'))).toBeVisible();
   await expect(element(by.id('Perfil.Tipo'))).toBeVisible();
   await expect(element(by.id('Perfil.Pais'))).toBeVisible();
   await expect(element(by.id('Perfil.Ciudad'))).toBeVisible();
   await expect(element(by.id('Perfil.Usuario'))).toBeVisible();
  
    });
  
  });
  