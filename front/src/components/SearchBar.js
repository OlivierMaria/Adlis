import React from "react";
import "../style/SearchForm.css";

const SearchBar = ({ onSearch }) => {
  return (
    <form
      className="searchForm"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="search"></label>
      <input
        id="search"
        type="text"
        required
        role="searchbox"
        placeholder="Trouve ton livre.."
        onChange={(e) => onSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
