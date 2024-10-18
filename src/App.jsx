// App.js
import React from 'react';
import TableComponent from './components/TableComponent';
import './App.css';
import TableComponentSecond from './components/TableComponentSecond';
import TableComponentThree from './components/TableComponentTHree';

function App() {
  return (
    <div className="App">
      <h1>Advanced Table with TanStack Table (React Table)</h1>
      <TableComponent />
      {/* <TableComponentSecond/> */}
      {/* <TableComponentThree/> */}
    </div>
  );
}

export default App;
