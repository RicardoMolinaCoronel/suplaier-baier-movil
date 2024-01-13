import React from 'react';
import { render } from '@testing-library/react-native';
import OrdenItem from '../components/OrdenItem';

describe('OrdenItem component', () => {
  test('renders correctly', () => {
    const { queryByTestId } = render(<OrdenItem />);
    const renderedElement = queryByTestId('ordenItemRoot');

    expect(renderedElement).toBeTruthy();
  });
});
