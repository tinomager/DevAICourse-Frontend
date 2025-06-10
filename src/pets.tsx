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

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const config = new Configuration({ basePath: BASE_PATH });
        const api = new PetApi(config);
        const response = await api.findPetsByStatus({ status: FindPetsByStatusStatusEnum.Available });
        setPets(response);
      } catch (err) {
        setError('Failed to fetch pets');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return <div>Loading pets...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2>Available Pets</h2>
      {pets.length === 0 ? (
        <p>No pets available</p>
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
        />
      )}
    </div>
  );
};

export default PetList;