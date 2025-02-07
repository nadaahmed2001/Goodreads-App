// SearchContext.js
import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('books'); // Default search type is books

  const handleSearch = (query, type) => {
    setSearchQuery(query);
    setSearchType(type);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, searchType, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
