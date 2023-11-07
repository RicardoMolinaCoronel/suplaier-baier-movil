import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Search_Input = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Icon name="search" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};


const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 9,
    padding: 5,
  },
  input: {
    flex: 1,
    padding: 5,
  },
  searchButton: {
    backgroundColor: 'deepskyblue',
    padding: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
};

export default Search_Input;
