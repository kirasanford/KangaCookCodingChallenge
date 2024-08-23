import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ItemList.css'; // Import the CSS file

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/items/${id}/`)
      .then(response => {
        setItem(response.data);
        setName(response.data.name);
        setIngredients(response.data.ingredients);
      })
      .catch(error => {
        console.error('Error fetching item:', error);
        setError('Error fetching item details.');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    axios.put(`http://localhost:8000/api/items/${id}/`, { name, ingredients })
      .then(() => navigate('/'))
      .catch(error => {
        console.error('Error updating item:', error);
        setError('Error updating item.');
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      axios.delete(`http://localhost:8000/api/items/${id}/`)
        .then(() => navigate('/'))
        .catch(error => {
          console.error('Error deleting item:', error);
          setError('Error deleting item.');
        });
    }
  };

  if (!item && !error) return <div>Loading...</div>;

  return (
    <div className="edit-item">
      <h2>Edit Recipe</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="card card-large">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Ingredients:</label>
            <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
          </div>
          <div className="card-actions">
            <button type="submit" className="card-button">Update Recipe</button>
            <button type="button" onClick={handleDelete} className="delete-button">Delete Recipe</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemDetail;
