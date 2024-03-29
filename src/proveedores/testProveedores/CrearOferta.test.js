import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CrearProductoPage from '../pages/CrearProductoPage';
import { AuthContext } from '../../auth/context/AuthContext'; // Importa AuthContext
import generarStringAleatorio from './utils';
import CrearOfertaPage from '../pages/CrearOfertaPage';
import renderer from "react-test-renderer"
const mockAuthState = {
    user: {
        IdUsuario: 3,
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
    
it('limite minimo y maximo de precio unitario, formato adecuado', async () => {
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
    
it('precio instantaneo no inferior a unitario, precio unitario e instantáneo válidos', async () => {
        const { getByTestId, getByText, queryAllByTestId } = render(
            <AuthProvider>
              <CrearOfertaPage
              />
            </AuthProvider>
        );
        let inputInst = getByTestId("CrearOferta.InputPI")
        let inputU = getByTestId("CrearOferta.InputPU")
        fireEvent.changeText(inputInst, "50")
        fireEvent.changeText(inputU, "80")
        await waitFor(() => {
        getByText("El precio instantáneo debe ser mayor o igual al precio mínimo")
    });
    fireEvent.changeText(inputU, "30")
        await waitFor(() => {
            expect(queryAllByTestId("CrearOferta.Error.InputPI").length).toBe(0)
            expect(queryAllByTestId("CrearOferta.Error.InputPU").length).toBe(0)
        });

})

it('limite minimo y maximo de precio instantaneo, formato adecuado', async () => {
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
    let inputU = getByTestId("CrearOferta.InputPU")
    fireEvent.changeText(inputU, "80")
    fireEvent.changeText(input, "5000.956")
    await waitFor(() => {
        getByText("El precio instantáneo debe ser con punto y tener dos decimales")

    });
      });

    
it('limite minimo y maximo de cantidad minima, formato adecuado', async () => {
        const { getByTestId, getByText, queryAllByTestId } = render(
            <AuthProvider>
              <CrearOfertaPage
              />
            </AuthProvider>
        );
        let input = getByTestId("CrearOferta.InputUMin")
        fireEvent.changeText(input, "-1")
        await waitFor(() => {
        getByText("La cantidad minima debe ser un número positivo")
    });
    fireEvent.changeText(input, "8001")
    await waitFor(() => {
    getByText("La cantidad minima no puede ser mayor a 8000")
    });
    fireEvent.changeText(input, "5000.9")
    await waitFor(() => {
    getByText("La cantidad minima debe ser un número entero")
    });
      });
    
    
it('limite minimo y maximo de cantidad máxima, formato adecuado', async () => {
        const { getByTestId, getByText } = render(
            <AuthProvider>
              <CrearOfertaPage
              />
            </AuthProvider>
        );
        let input = getByTestId("CrearOferta.InputUMax")
        fireEvent.changeText(input, "-1")
        await waitFor(() => {
        getByText("La cantidad total debe ser un número positivo")
    });
    fireEvent.changeText(input, "8001")
    await waitFor(() => {
    getByText("La cantidad máxima no puede ser mayor a 8000")
    });
    fireEvent.changeText(input, "5000.9")
    await waitFor(() => {
    getByText("La cantidad total debe ser un número entero")
    });
      });

it('unidades maximas no inferior a minimas, unidades minimas y maximas válidas', async () => {
        const { getByTestId, getByText, queryAllByTestId } = render(
            <AuthProvider>
              <CrearOfertaPage
              />
            </AuthProvider>
        );
        let inputMin = getByTestId("CrearOferta.InputUMin")
        let inputMax = getByTestId("CrearOferta.InputUMax")
        fireEvent.changeText(inputMin, "70")
        fireEvent.changeText(inputMax, "60")
        await waitFor(() => {
        getByText("La cantidad total debe ser mayor o igual a la cantidad minima")
    });
    fireEvent.changeText(inputMin, "30")
    await waitFor(() => {
        expect(queryAllByTestId("CrearOferta.Error.InputUMin").length).toBe(0)
        expect(queryAllByTestId("CrearOferta.Error.InputUMax").length).toBe(0)
    });
})

    
it('limite minimo y maximo de caracteres descripcion e input válido', async () => {
        const { getByTestId, getByText } = render(
            <AuthProvider>
              <CrearOfertaPage
              />
            </AuthProvider>
        );
        let input = getByTestId("CrearOferta.InputDescripcion")
        fireEvent.changeText(input, "A")
        await waitFor(() => {
        getByText("La descripción no puede ser menor a 20 caracteres")
    });
    fireEvent.changeText(input, generarStringAleatorio(481))
    await waitFor(() => {
    getByText("La descripción no puede ser superior a los 480 caracteres")
    });
    fireEvent.changeText(input, generarStringAleatorio(380))
    await waitFor(() => {
        expect(getByTestId("CrearOferta.Error.InputDescripcion")).toHaveTextContent("")
    });
      });  
 
    })
  



 



