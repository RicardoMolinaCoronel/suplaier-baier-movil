import React from 'react';
import { render } from '@testing-library/react-native';
import { DetalleProducto } from '../components/DetalleProducto';

describe('DetalleProducto component', () => {
  test('renders correctly', () => {

    const mockProps = {
      isvisible: true,
      onclose: jest.fn(),
      dataproducto: {},
    };

    const { queryByTestId } = render(<DetalleProducto {...mockProps} />);

    expect(queryByTestId('detalleProductoComponent')).toBeTruthy();
  });
});
