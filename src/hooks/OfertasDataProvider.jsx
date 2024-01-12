import { useContext, useState, createContext } from "react";
import { apiUrl } from "../../apiUrl";
import { AuthContext } from "../auth/context/AuthContext";
const DataContext = createContext();

const OfertasDataProvider = ({ children }) => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;
  const [ofertasTodos, setOfertasTodos] = useState([]);
  const [ofertasProv, setOfertasProv] = useState([]);

  const getOfertasProv = async () => {
    const resp = await globalThis.fetch(
      `${apiUrl}/ofertas?idProveedor=${user.IdUsuario}`
    );
    const data = await resp.json();
    const { rows: ofertas } = !!data && data;
    setOfertasProv(ofertas);
  };

  const getOfertasTodos = async () => {
    // ofertas por devolver pago
    const resp = await fetch(`${apiUrl}/ofertas?idEstadosOferta=${1}`);
    const data = await resp.json();

    const { rows: ofertas } = !!data && data;
    setOfertasTodos(ofertas);
  };

  //   useEffect(() => {
  //     getOfertasTodos();
  //     // eslint-disable-next-line
  //   }, []);
  return (
    <DataContext.Provider
      value={{ ofertasTodos, getOfertasTodos, ofertasProv, getOfertasProv }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
export default OfertasDataProvider;
