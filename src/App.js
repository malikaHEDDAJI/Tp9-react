import React, { useRef } from 'react';
import CompteList from './components/CompteList';
import CompteForm from './components/CompteForm';

function App() {
  const listRef = useRef();

  return (
    <div>
      <CompteForm onCompteAdded={() => listRef.current.fetchComptes()} />
      <CompteList ref={listRef} />
    </div>
  );
}

export default App;
