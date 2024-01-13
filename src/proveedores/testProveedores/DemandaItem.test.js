import React from 'react';
import { render } from '@testing-library/react-native';
import DemandaItem from '../components/DemandaItem';
import { AuthContext } from '../../auth/context/AuthContext';

const authContextValue = {
  authState: {
    user: {
      IdUsuario: 1,
 
    },
  },
};

describe('DemandaItem component', () => {
  test('renders correctly', () => {
 
    const demandaData = {
      FechaLimite: new Date(),
      Maximo: '10', 
      ActualProductos: '5', 
 
    };

    const { queryByTestId } = render(
      <AuthContext.Provider value={authContextValue}>
        <DemandaItem {...demandaData} />
      </AuthContext.Provider>
    );

    const renderedElement = queryByTestId('demandaItemRoot');

    expect(renderedElement).toBeTruthy();
  });
});
