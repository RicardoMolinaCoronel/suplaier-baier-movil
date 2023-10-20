import { Navigate } from 'react-router-native'

// eslint-disable-next-line react/prop-types
const PublicRoutes = ({ children }) => {
  const tipoPage = (tipo) => {
    switch (tipo) {
      case 'comprador':
        return '/comprador/home'
      case 'proveedor':
        return '/proveedor/home'
    }
  }

  return (
    // eslint-disable-next-line no-constant-condition
    true
      ? children
    // eslint-disable-next-line react/react-in-jsx-scope
      : <Navigate to={tipoPage('proveedor')} />
  )
}

export default PublicRoutes
