import { useState } from "react";
import { apiUrl } from '../../../apiUrl';

async function performSearch(q) {
  const response = await fetch(`${apiUrl}/ofertaByProducto?q=${q}`);
  const data = await response.json();
  return data.rows || [];
}

const Search_Logic= () =>{

  const [ofertasBusqueda, setOfertasBusqueda] = useState([]);

  const getOfertasTodos = async(q) => {
    const ofertas = await performSearch(q);
    setOfertasBusqueda(ofertas.filter((oferta) => oferta.IdEstadosOferta === 1));
  }


  return {
    ofertasBusqueda,
    getOfertasTodos,
  };
}

export default Search_Logic;
