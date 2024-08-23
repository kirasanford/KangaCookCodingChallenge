import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:8000/api/items/', { name, ingredients });
      navigate('/');
    } catch (err) {
      console.error('Error adding item:', err);
      setError('Error adding item. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Add New Item</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ingredients:</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;