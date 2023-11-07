import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useParams } from 'react-router-native';
import { apiUrl } from "../../../apiUrl";



export const Search_Logic = () => {
  const { q = "" } = useParams(); 
  const [ofertasBusqueda, setOfertasBusqueda] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const performSearch = async () => {
    const resp = await fetch(`${apiUrl}/ofertaByProducto?q=${q}`);
    const data = await resp.json();
    const { rows: ofertas } = !!data && data;
    setOfertasBusqueda(ofertas.filter((oferta) => oferta.IdEstadosOferta === 1));
    setSearchResults(ofertas);
  }

  useEffect(() => {
    performSearch();
  }, [q]);

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.titleText}>
          Resultado de búsqueda: {q}
        </Text>
        <View style={styles.separator} />
        {searchResults && searchResults.map((result) => (
          <Text key={result.id}>{result.title}</Text>
        ))}
      </View>
      {ofertasBusqueda.length === 0 && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No se han encontrado ofertas</Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  resultContainer: {
    flex: 2,
    backgroundColor: 'lightgray',
  },
  titleText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 10,
  },
  errorContainer: {
    display: 'flex',
  },
  errorText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
};

