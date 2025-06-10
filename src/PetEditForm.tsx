import React, { useState, useEffect } from 'react';
import type { Pet } from './generated/models/Pet';
import type { Category } from './generated/models/Category';
import { PetStatusEnum } from './generated/models/Pet';
import { PetApi } from './generated/apis/PetApi';
import { CategoryApi } from './generated/apis/CategoryApi';
import { Configuration } from './generated/runtime';
import { BASE_PATH } from './apiConfig';
import './App.css';

interface PetEditFormProps {
  pet: Pet;
  onClose: () => void;
  onUpdate: (updatedPet: Pet) => void;
}

const PetEditForm: React.FC<PetEditFormProps> = ({ pet, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Pet>({ ...pet });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newPhotoUrl, setNewPhotoUrl] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setFormData({ ...pet });
  }, [pet]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePhotoUrlChange = (index: number, value: string) => {
    const newPhotoUrls = [...formData.photoUrls];
    newPhotoUrls[index] = value;
    setFormData(prevState => ({
      ...prevState,
      photoUrls: newPhotoUrls
    }));
  };

  const addPhotoUrl = () => {
    if (newPhotoUrl.trim()) {
      setFormData(prevState => ({
        ...prevState,
        photoUrls: [...prevState.photoUrls, newPhotoUrl]
      }));
      setNewPhotoUrl('');
    }
  };

  const removePhotoUrl = (index: number) => {
    setFormData(prevState => ({
      ...prevState,
      photoUrls: prevState.photoUrls.filter((_, i) => i !== index)
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const config = new Configuration({ basePath: BASE_PATH });
        const api = new CategoryApi(config);
        const response = await api.getAllCategories();
        setCategories(response);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(e.target.value, 10);
    const category = categories.find(cat => cat.id === categoryId);

    setFormData(prevState => ({
      ...prevState,
      category: category || undefined
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const config = new Configuration({ basePath: BASE_PATH });
      const api = new PetApi(config);
      const response = await api.updatePet({ pet: formData });
      onUpdate(response);
      onClose();
    } catch (err) {
      setError('Failed to update pet');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!pet) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Edit Pet</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category:
            <select
              value={formData.category?.id || ''}
              onChange={handleCategoryChange}
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Status:
            <select
              name="status"
              value={formData.status || ''}
              onChange={handleChange}
            >
              <option value="">Select status</option>
              {Object.values(PetStatusEnum).map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </label>
          <div>
            <h4>Photo URLs</h4>
            {formData.photoUrls.map((url, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handlePhotoUrlChange(index, e.target.value)}
                  style={{ flex: 1, marginRight: '0.5em' }}
                />
                <button type="button" onClick={() => removePhotoUrl(index)} style={{ flexShrink: 0 }}>
                  Remove
                </button>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="Add new photo URL"
                style={{ flex: 1, marginRight: '0.5em' }}
              />
              <button type="button" onClick={addPhotoUrl} style={{ flexShrink: 0 }}>
                Add
              </button>
            </div>
          </div>
          {error && <div className="error">{error}</div>}
          <div className="popup-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Pet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetEditForm;