import React from 'react';
import { render } from '@testing-library/react-native';
import OfertasList from '../components/OfertasList';

// Mock useData hook
jest.mock('../../hooks/OfertasDataProvider', () => ({
  useData: jest.fn(() => ({
    ofertasProv: [],
    getOfertasProv: jest.fn(),
  })),
}));

describe('OfertasList component', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<OfertasList />);

    // Assuming you have a testID assigned to a top-level component
    expect(getByTestId('ofertas-list')).toBeTruthy();
});
});
