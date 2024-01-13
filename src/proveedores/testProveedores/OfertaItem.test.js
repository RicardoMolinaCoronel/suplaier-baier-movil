import React from 'react';
import { render } from '@testing-library/react-native';
import OfertaItem from '../components/OfertaItem';

describe('OfertaItem component', () => {
  test('renders correctly', () => {

    const mockProps = {
      IdOferta: 1,
      IdProducto: 2,
      IdProveedor: 3,
      IdEstadosOferta: 4,
      Descripcion: 'Sample description',
      FechaLimite: new Date().toISOString(),
      Maximo: '10',
      Minimo: '5',
      ActualProductos: '2',
      ValorUProducto: '9.99',
      ValorUInstantaneo: '19.99',
    };

    const { getByTestId } = render(<OfertaItem {...mockProps} />);

    expect(getByTestId('oferta-item')).toBeTruthy();
  });
});
