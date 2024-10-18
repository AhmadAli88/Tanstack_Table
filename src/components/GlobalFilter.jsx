// GlobalFilter.js
import React from 'react';

export const MyGlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <span>
      Search:{' '}
      <input
        value={globalFilter || ''} // Ensure value is controlled and not undefined
        onChange={(e) => setGlobalFilter(e.target.value)} // Update state with input value
        placeholder="Search all columns..."
      />
    </span>
  );
};
