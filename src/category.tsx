import React, { useEffect, useState } from 'react';
import type { Category } from './generated/models/Category';
import './App.css';

import { CategoryApi } from './generated/apis/CategoryApi';
import { Configuration } from './generated/runtime';
import { BASE_PATH } from './apiConfig';

// Function to fetch categories from the API
const fetchCategories = async (): Promise<Category[]> => {
  try {
    const config = new Configuration({ basePath: BASE_PATH });
    const categoryApi = new CategoryApi(config);
    const categories = await categoryApi.getAllCategories();
    return categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};

// The updated CategoryList component is below, keeping the new functionality

// Popup form component for editing category
const EditCategoryForm: React.FC<{
  category: Category;
  onClose: () => void;
  onSave: (updatedCategory: Category) => void;
}> = ({ category, onClose, onSave }) => {
  const [name, setName] = useState(category.name || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCategory = { ...category, name };
    try {
      const config = new Configuration({ basePath: BASE_PATH });
      const categoryApi = new CategoryApi(config);
      await categoryApi.updateCategory({ category: updatedCategory });
      onSave(updatedCategory);
      onClose();
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Edit Category</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <div className="popup-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main CategoryList component
const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
  };

  const handleSave = (updatedCategory: Category) => {
    setCategories(categories.map(cat =>
      cat.id === updatedCategory.id ? updatedCategory : cat
    ));
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2>Categories</h2>
      {categories.length === 0 ? (
        <p>No categories available</p>
      ) : (
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.id} className="category-item">
              <h3>{category.name}</h3>
              <button onClick={() => handleEdit(category)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
      {editingCategory && (
        <EditCategoryForm
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CategoryList;