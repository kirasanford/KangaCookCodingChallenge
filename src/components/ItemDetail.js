import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/items/${id}/`);
        setItem(response.data);
        setName(response.data.name);
        setIngredients(response.data.ingredients);
      } catch (err) {
        console.error('Error fetching item details:', err);
        setError('Error fetching item details. Please try again later.');
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(`http://localhost:8000/api/items/${id}/`, { name, ingredients });
      navigate('/');
    } catch (err) {
      console.error('Error updating item:', err);
      setError('Error updating item. Please try again later.');
    }
  };

  if (!item && !error) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Recipe</h2>
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
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default ItemDetail;
