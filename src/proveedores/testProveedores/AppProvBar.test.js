import React from 'react';
import { render } from '@testing-library/react-native';
import AppProvBar from '../components/AppProvBar'; // Asegúrate de que la ruta al componente sea correcta
import { AuthContext } from '../../auth/context/AuthContext'; // Importa AuthContext

// Mocks para módulos externos
jest.mock('react-native-ico-material-design', () => 'Icon');
jest.mock('expo-constants', () => 'Constants');
jest.mock('../../theme.js', () => ({
  bottomBar: {
    iconPrimary: '#fff',
  },
  appBar: {
    secondary: '#404040',
  },
}));

// Estado de prueba para AuthContext
const mockAuthState = {
  user: {
    UrlLogoEmpresa: 'http://example.com/logo.png',
  },
};

// Mock del módulo AuthContext
jest.mock('../../auth/context/AuthContext', () => ({
  AuthContext: {
    Consumer: jest.fn(),
    Provider: jest.fn(),
  },
}));

// Proporciona un valor predeterminado para AuthContext durante la prueba
AuthContext.Consumer.mockImplementation(({ children }) => children(mockAuthState));

// Wrapper de prueba para AuthContext
const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={{ authState: mockAuthState }}>
    {children}
  </AuthContext.Provider>
);

describe('<AppProvBar />', () => {
  it('se renderiza correctamente', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <AppProvBar
          closeButtonOffset={0}
          scaleValue={1}
          offsetValue={0}
          showMenu={false}
          setShowMenu={() => {}}
        />
      </AuthProvider>
    );

    // Aquí puedes agregar más pruebas
  });

  // Más pruebas según sea necesario
});
