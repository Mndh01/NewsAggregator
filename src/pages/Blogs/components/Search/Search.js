// Search.js
import React, { useState } from 'react';

const Search = ({ onSearch, searchTerm }) => {

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className='d-inline-block' onSubmit={handleSubmit}>
      <div className='form-group d-flex align-content-center'>
        <input
          style={{maxWidth: '200px', display: 'inline', borderTopRightRadius: '0', borderBottomRightRadius: '0'}}
          className='form-control'
          type="text"
          placeholder="Search articles..."
          value={ searchTerm }
          onChange={handleSearchChange}
        />
        <button type="submit" className='btn btn-primary' style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0'}}>Search</button>
      </div>
    </form>
  );
}

export default Search;
