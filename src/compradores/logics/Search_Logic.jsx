import { useState } from "react";
import { apiUrl } from '../../../apiUrl';

async function performSearch(q, categoriaId = null) {
  const url = categoriaId 
    ? `${apiUrl}/pubbycategoria?id=${categoriaId}&q=${q}` 
    : `${apiUrl}/ofertaByProducto?q=${q}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.rows || [];
}

const Search_Logic = () => {
  const [ofertasBusqueda, setOfertasBusqueda] = useState([]);

  const getOfertasTodos = async (q) => {
    try {
      const ofertas = await performSearch(q);
      setOfertasBusqueda(ofertas.filter((oferta) => oferta.IdEstadosOferta === 1));
    } catch (error) {
      console.error('Error en getOfertasTodos: ', error);
      setOfertasBusqueda([]);
    }
  };

  const getOfertasPorCategoria = async (q, categoriaId) => {
    try {
      const ofertas = await performSearch(q, categoriaId);
      setOfertasBusqueda(ofertas.filter((oferta) => oferta.IdEstadosOferta === 1));
    } catch (error) {
      console.error('Error en getOfertasPorCategoria: ', error);
      setOfertasBusqueda([]);
    }
  };

  return {
    ofertasBusqueda,
    getOfertasTodos,
    getOfertasPorCategoria,
  };
}

export default Search_Logic;

