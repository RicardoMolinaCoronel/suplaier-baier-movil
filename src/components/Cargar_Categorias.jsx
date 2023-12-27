import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import List_Categoria from './List_Categoria';
import { apiUrl } from '../../apiUrl';

export const Cargar_Categorias = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/catProductos`);
        const data = await response.json();
        const { rows: categorias } = data;
        setCategorias(categorias);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray' }} />
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <List_Categoria categorias={categorias} />
      )}
    </View>
  );
};
export default Cargar_Categorias;