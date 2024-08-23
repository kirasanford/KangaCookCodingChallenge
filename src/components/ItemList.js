import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ItemList.css'; // Import the CSS file

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/items/');
        setItems(response.data);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Error fetching items.');
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="item-list">
      <h2>Recipe Book</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="card-container">
        {items.map(item => (
          <div key={item.id} className="card">
            <h3>{item.name}</h3>
            <p>{item.ingredients}</p>
            <div className="card-actions">
              <Link to={`/edit/${item.id}`} className="card-link">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;