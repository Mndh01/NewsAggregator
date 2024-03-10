import React from 'react';


import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from 'date-fns';


const Filters = ({ categories, sources, date, onFilterChange, resetFilters}) => {
  
  const handleCategoryChange = (e) => {
    onFilterChange('category', e.target.value.toLowerCase());
  };

  const handleSourceChange = (e) => {
    onFilterChange('source', e.target.value);
  };

  const handleDateChange = (date) => {
    onFilterChange('date', date);
  };

  const handleReset = () => {
    resetFilters();
  };

  return (
    <Dropdown className='d-inline-block mt-2 mt-sm-0'>
        <Dropdown.Toggle className='ml-sm-2' variant="outline-primary" id="dropdown-basic">
          <img src='/filter.png' style={{ width: '1rem', color: 'red' }} />
        </Dropdown.Toggle>
        <button className='btn btn-outline-danger ml-2' onClick={ handleReset }>Reset</button>

      <Dropdown.Menu style={{ padding: '.8rem', minWidth: '250px' }}>
        <div>
          <h5>Filter By:</h5>
          <label htmlFor="category">Category:</label>
          <select className='form-select' id="category" onChange={ handleCategoryChange }>
            <option value="">All</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {/* <h5 className='mt-2'>Or</h5> */}
          <label htmlFor="source">Source:</label>
          <select className='form-select' id="source" onChange={handleSourceChange}>
            <option value="">All</option>
            {sources.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>
        <div className='d-flex flex-column'>
        <label htmlFor="date">After Date:</label>
          <DatePicker
            showIcon
            className='form-control'
            selected={ date }
            dateFormat="yyyy-MM-dd"
            onChange={(date) => handleDateChange(date)}
            minDate={subDays(new Date(), 30)}
            placeholderText="Start Date"
          />
        </div>
      </Dropdown.Menu>
    </Dropdown>

  );
}

export default Filters;