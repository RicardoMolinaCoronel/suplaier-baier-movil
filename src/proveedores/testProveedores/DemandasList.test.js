import React from 'react';
import { render } from '@testing-library/react-native';
import DemandasList from '../components/DemandasList';
import { useData } from '../../hooks/DemandasDataProvider';

jest.mock('../../hooks/DemandasDataProvider'); // Mock the Data Provider hook

const demandasTodosMock = [
  // Your mock data here
];

describe('DemandasList component', () => {
  test('renders correctly', () => {
    // Mock the hook implementation
    useData.mockReturnValue({
      demandasTodos: demandasTodosMock,
      getDemandasTodos: jest.fn(),
    });

    const { queryByTestId } = render(<DemandasList />);

    const renderedElement = queryByTestId('demandaListRoot'); // Adjust the test ID as needed

    expect(renderedElement).toBeTruthy();
  });
});
