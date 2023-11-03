import  { useState } from 'react';

function Search_Logic() {
  const [searchResults, setSearchResults] = useState([]);
  const data = [
    { id: 1, title: 'Resultado 1' },
    { id: 2, title: 'Resultado 2' },
    { id: 3, title: 'Resultado 3' },
    { id: 4, title: 'Resultado 4' },
  ];

  const performSearch = (searchText) => {
    // Esto es para probar la búsqueda
    const results = data.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(results);
  };

  return {
    searchResults,
    performSearch,
  };
}

export default Search_Logic;
