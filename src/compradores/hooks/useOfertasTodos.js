import {  useState, useEffect } from "react";
import { apiUrl } from "../../../apiUrl";


const useOfertasTodos = () => {
const [ofertasTodos, setOfertasTodos] = useState([]);

const getOfertasTodos = async() => {
  // ofertas por devolver pago
  const resp = await fetch(`${apiUrl}/ofertas?idEstadosOferta=${1}`);
  const data = await resp.json();
  const {rows: ofertas} = !!data && data;
  setOfertasTodos(ofertas);
}

useEffect(() => {
  getOfertasTodos();
  // eslint-disable-next-line
  
}, [])
return {ofertasTodos};
}
export default useOfertasTodos