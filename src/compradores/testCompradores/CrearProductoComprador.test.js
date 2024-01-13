import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CrearProductoPage from '../pages/CrearProductoPage';
import generarStringAleatorio from './utils';



describe('<CrearProductoPage /> Comprador', () => {
    it('se renderiza correctamente', () => {
      render(
          <CrearProductoPage
          />
      );
      });
      it('ingresar todos los campos', async () => {
        const { getByTestId, getByText } = render(
            <CrearProductoPage
            />
        );
        //fireEvent.changeText(getByTestId("nombreProducto"), "b")
        fireEvent.press(getByTestId("CrearProducto.Button"))
        await waitFor(() => {
        getByText("El nombre del producto es requerido")
        getByText("La descripción es requerida")
        getByText("La categoría del producto es requerida")
    });
      });
    
      it('limite minimo y maximo de caracteres nombre', async () => {
        const { getByTestId, getByText } = render(
            <CrearProductoPage
            />
        );
        //fireEvent.changeText(getByTestId("nombreProducto"), "b")
        fireEvent.changeText(getByTestId("CrearProducto.InputNombre"), "A")
        await waitFor(() => {
        getByText("El nombre no puede ser menor a 3 caracteres")
    });
    fireEvent.changeText(getByTestId("CrearProducto.InputNombre"), generarStringAleatorio(61))
    await waitFor(() => {
    getByText("El nombre no puede ser mayor a 60 caracteres")
    });
      });
    
      it('limite minimo y maximo de caracteres descripcion', async () => {
        const { getByTestId, getByText } = render(
            <CrearProductoPage
            />
        );
        //fireEvent.changeText(getByTestId("nombreProducto"), "b")
        fireEvent.changeText(getByTestId("CrearProducto.InputDescripcion"), "A")
        await waitFor(() => {
        getByText("La descripción no puede ser menor a 5 caracteres")
    });
    fireEvent.changeText(getByTestId("CrearProducto.InputDescripcion"), generarStringAleatorio(481))
    await waitFor(() => {
    getByText("La descripción no puede ser superior a los 480 caracteres")
    });
      });  
    
  });









