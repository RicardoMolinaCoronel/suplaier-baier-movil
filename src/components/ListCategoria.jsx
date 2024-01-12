import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const List_Categoria = ({ categorias, onSelectCategoria }) => {
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  const handleValueChange = (itemValue) => {
    setSelectedCategoria(itemValue);
    onSelectCategoria(
      categorias.find((cat) => cat.IdCatProducto === itemValue)
    );
  };

  // Optimización: Usar useMemo para calcular el nombre de la categoría seleccionada
  // Esto evita buscar en el array en cada renderizado

  return (
    <View style={styles.container}>
      <Text style={styles.selectedText}>Categoría:</Text>
      <Picker
        selectedValue={selectedCategoria}
        onValueChange={handleValueChange} // Usar handleValueChange aquí
        style={styles.picker}
      >
        <Picker.Item label="Todas" value={null} />
        {categorias?.map((cat) => (
          <Picker.Item
            key={cat.IdCatProducto}
            label={cat.Nombre}
            value={cat.IdCatProducto}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    padding: 10,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
  },
});

export default List_Categoria;
