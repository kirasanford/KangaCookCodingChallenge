import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ItemList.css';

const AddItem = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    axios.post('http://localhost:8000/api/items/', { name, ingredients })
      .then(() => navigate('/'))
      .catch(error => {
        console.error('Error adding item:', error);
        setError('Error adding item.');
      });
  };

  return (
    <div className="add-item">
      <h2>Add New Recipe</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="card card-large">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="ingredients">Ingredients:</label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
