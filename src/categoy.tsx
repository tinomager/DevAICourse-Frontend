import React, { useEffect, useState } from 'react';
import type { Category } from './generated/models/Category';
import './App.css';

// Mock API function to simulate fetching categories
const fetchCategories = async (): Promise<Category[]> => {
  // Simulate a network request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Dogs' },
        { id: 2, name: 'Cats' },
        { id: 3, name: 'Birds' },
        { id: 4, name: 'Fish' },
      ]);
    }, 1000);
  });
};

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;