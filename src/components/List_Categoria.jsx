import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const List_Categoria = ({ categorias }) => {
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  return (
    <View>
      <Picker
        selectedValue={selectedCategoria}
        onValueChange={(itemValue, itemIndex) => setSelectedCategoria(itemValue)}
      >
        <Picker.Item label="Seleccionar Categoría" value={null} />
        {categorias?.map((cat) => (
          <Picker.Item key={cat.IdCatProducto} label={cat.Nombre} value={cat.IdCatProducto} />
        ))}
      </Picker>

      {selectedCategoria && (
        <Text>
          Categoría seleccionada: {categorias.find((cat) => cat.IdCatProducto === selectedCategoria)?.Nombre}
        </Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    padding: 10, 
  },
  listItem: {
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderColor: 'lightgray',
    padding: 10, 
  },
  listItemText: {
    flex: 1, 
    fontSize: 16,
  },
});

export default List_Categoria;