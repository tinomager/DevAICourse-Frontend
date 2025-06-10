import './App.css';
import PetList from './pets';
import CategoryList from './category';
import { useState } from 'react';

function App() {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <>
      <h1>Petstore</h1>
      <nav>
        <button onClick={() => setShowCategories(false)}>Pets</button>
        <button onClick={() => setShowCategories(true)}>Categories</button>
      </nav>
      {showCategories ? <CategoryList /> : <PetList />}
    </>
  );
}

export default App;
