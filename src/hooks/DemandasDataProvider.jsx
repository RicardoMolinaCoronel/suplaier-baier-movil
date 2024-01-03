import { useContext, useState, useEffect, createContext } from "react";
import { apiUrl } from "../../apiUrl";
import { AuthContext } from "../auth/context/AuthContext";
const DataContext = createContext();

const DemandasDataProvider = ({ children }) => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;
  const [demandasTodos, setDemandasTodos] = useState([]);
  const [demandasComp, setDemandasComp] = useState([]);

  const getDemandasComp = async () => {
    const resp = await globalThis.fetch(
      `${apiUrl}/demandas?IdComprador=${user.IdUsuario}`
    );
    const data = await resp.json();
    const { rows: demandas } = !!data && data;
    setDemandasComp(demandas);
  };

  const getDemandasTodos = async () => {
    //ofertas por devolver pago
    const resp = await fetch(`${apiUrl}/demandas?idEstadosOferta=${1}`);
    const data = await resp.json();
    const { rows: demandas } = !!data && data;
    setDemandasTodos(demandas);
  };

  //   useEffect(() => {
  //     getOfertasTodos();
  //     // eslint-disable-next-line
  //   }, []);
  return (
    <DataContext.Provider
      value={{ demandasTodos, getDemandasTodos, demandasComp, getDemandasComp }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
export default DemandasDataProvider;
