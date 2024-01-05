import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator,StyleSheet } from 'react-native';
import List_Categoria from './ListCategoria';
import { apiUrl } from '../../apiUrl';

export const Cargar_Categorias = ({ onSelectCategoria }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiUrl}/catProductos`);
        const data = await response.json();
        setCategorias(data.rows);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <List_Categoria categorias={categorias} onSelectCategoria={onSelectCategoria} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    // Otros estilos necesarios
  }
});
export default Cargar_Categorias;