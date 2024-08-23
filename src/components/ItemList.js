import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/items/')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.ingredients}
            <button onClick={() => handleEdit(item.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
