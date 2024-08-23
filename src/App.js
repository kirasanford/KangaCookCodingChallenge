import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemList from './components/ItemList';
import AddItem from './components/AddItem';
import ItemDetail from './components/ItemDetail';
import Navbar from './components/NavBar';
import './index.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="/edit/:id" element={<ItemDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;