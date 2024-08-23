import React from 'react';

function Item({ item }) {
  return (
    <li>
      <h2>{item.name}</h2>
      <p>{item.ingredients}</p>
    </li>
  );
}

export default Item;
