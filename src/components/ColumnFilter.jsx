// ColumnFilter.js
import React from 'react';

export const ColumnFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <span>
      Filter:{' '}
      <input
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter column..."
      />
    </span>
  );
};
