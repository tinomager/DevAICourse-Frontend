import React, { useEffect, useState } from 'react';
import type { Pet } from './generated/models/Pet';
import { PetApi, FindPetsByStatusStatusEnum } from './generated/apis/PetApi';
import './App.css';
import { Configuration } from './generated/runtime';
import { BASE_PATH } from './apiConfig';
import PetEditForm from './PetEditForm';

const PetList: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [addingPet, setAddingPet] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<'all' | FindPetsByStatusStatusEnum>('available');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const config = new Configuration({ basePath: BASE_PATH });
        const api = new PetApi(config);
        let statusParam: FindPetsByStatusStatusEnum | undefined;
        if (selectedStatus !== 'all') {
          statusParam = selectedStatus as FindPetsByStatusStatusEnum;
        }
        const response = await api.findPetsByStatus({ status: statusParam });
        setPets(response);
      } catch (err) {
        setError('Failed to fetch pets');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [selectedStatus]);

  if (loading) {
    return <div>Loading pets...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const handleAddPet = (newPet: Pet) => {
    setPets(prevPets => [newPet, ...prevPets]);
  };

  const handleAddButtonClick = () => {
    console.log("Add Pet button clicked");
    setAddingPet(true);
  };

  return (
    <div>
      <h2>Pets</h2>
      <div className="status-filter">
        <label htmlFor="status-select">Filter by status: </label>
        <select
          id="status-select"
          value={selectedStatus}
          onChange={(e) => {
            const newStatus = e.target.value as 'all' | FindPetsByStatusStatusEnum;
            setSelectedStatus(newStatus);
            setLoading(true);
          }}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
      </div>
      <button onClick={handleAddButtonClick} className="add-pet-button">
        Add Pet
      </button>
      {pets.length === 0 ? (
        <p>No pets {selectedStatus === 'all' ? 'found' : `with status ${selectedStatus}`}</p>
      ) : (
        <ul className="pet-list">
          {pets.map((pet) => (
            <li key={pet.id} className="pet-item">
              <h3>{pet.name}</h3>
              {pet.category && <p>Category: {pet.category.name}</p>}
              <p>Photos:</p>
              <ul>
                {pet.photoUrls.map((url, index) => (
                  <li key={index}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
              {pet.tags && pet.tags.length > 0 && (
                <p>
                  Tags: {pet.tags.map((tag) => tag.name).join(', ')}
                </p>
              )}
              <p>Status: {pet.status}</p>
              <button onClick={() => setEditingPet(pet)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
      {editingPet && (
        <PetEditForm
          pet={editingPet}
          onClose={() => setEditingPet(null)}
          onUpdate={(updatedPet: Pet) => {
            setPets(prevPets =>
              prevPets.map(pet => (pet.id === updatedPet.id ? updatedPet : pet))
            );
            setEditingPet(null);
          }}
          onCreate={handleAddPet}
        />
      )}
      {addingPet && (
        <PetEditForm
          pet={null}
          onClose={() => {
            console.log("Closing add pet form");
            setAddingPet(false);
          }}
          onUpdate={handleAddPet}
          onCreate={handleAddPet}
        />
      )}
    </div>
  );
};

export default PetList;