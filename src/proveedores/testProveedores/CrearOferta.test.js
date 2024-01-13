import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CrearProductoPage from '../pages/CrearProductoPage';
import { AuthContext } from '../../auth/context/AuthContext'; // Importa AuthContext
import generarStringAleatorio from './utils';
import CrearOfertaPage from '../pages/CrearOfertaPage';

const mockAuthState = {
    user: {
        IdUsuario: 1,
      UrlLogoEmpresa: 'http://example.com/logo.png',
    },
  };

  const AuthProvider = ({ children }) => (
    <AuthContext.Provider value={{ authState: mockAuthState }}>
      {children}
    </AuthContext.Provider>
  );

  describe('<CrearOfertaPage />', () => {
    it('se renderiza correctamente', () => {
      render(
        <AuthProvider>
          <CrearOfertaPage
          />
        </AuthProvider>
      );
      // Aquí puedes agregar más pruebas
    });  
  });

  it('ingresar todos los campos', async () => {
    const { getByTestId, getByText } = render(
        <AuthProvider>
          <CrearOfertaPage
          />
        </AuthProvider>
    );
    //fireEvent.changeText(getByTestId("nombreProducto"), "b")
    fireEvent.press(getByTestId("CrearOferta.Button"))
    await waitFor(() => {
    getByText('El producto es requerido')
    getByText("La descripción es requerida")
    getByText('El precio mínimo es requerido')
    getByText('El precio instantáneo es requerido')
    getByText('La cantidad mínima de unidades es requerida')
    getByText("La cantidad total es requerida")
    getByText('La fecha límite es requerida')    
});
  });

  it('limite minimo y maximo de precio unitario, y formato adecuado', async () => {
    const { getByTestId, getByText } = render(
        <AuthProvider>
          <CrearOfertaPage
          />
        </AuthProvider>
    );
    let input = getByTestId("CrearOferta.InputPU")
    fireEvent.changeText(input, "-1")
    await waitFor(() => {
    getByText("El precio mínimo debe ser un número positivo")
});
fireEvent.changeText(input, "10001")
await waitFor(() => {
getByText("El precio mínimo no puede ser mayor a 10000")
});
fireEvent.changeText(input, "5000.9")
await waitFor(() => {
getByText("El precio unitario debe ser con punto y tener dos decimales")
});
  });

  it('limite minimo y maximo de precio instantaneo, y formato adecuado', async () => {
    const { getByTestId, getByText } = render(
        <AuthProvider>
          <CrearOfertaPage
          />
        </AuthProvider>
    );
    let input = getByTestId("CrearOferta.InputPI")
    fireEvent.changeText(input, "-1")
    await waitFor(() => {
    getByText("El precio instantáneo debe ser un número positivo")
});
fireEvent.changeText(input, "10001")
await waitFor(() => {
getByText("El precio máximo no puede ser mayor a 10000")
});
fireEvent.changeText(input, "5000.9")
await waitFor(() => {
getByText("El precio instantáneo debe ser mayor o igual al precio mínimo")
});
  });

 



