import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

const App = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/items');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/items/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchData();
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    const itemToEdit = data.find((item) => item.id === id);
    setEditedData({
      name: itemToEdit.name,
      price: itemToEdit.price,
      description: itemToEdit.description,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3001/items/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });
      if (response.ok) {
        fetchData();
        setEditingId(null);
        setEditedData({ name: '', price: '', description: '' });
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <h1>Menu API</h1>
      <div className={styles.cardGrid}>
        {data.map((item) => (
          <div key={item.id} className={`${styles.card} ${editingId === item.id ? styles.editing : ''}`}>
            <div className={styles.imageContainer}>
              <img src={item.image} alt={item.name} className={styles.image} />
            </div>
            {editingId === item.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editedData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
                <input
                  type="text"
                  name="price"
                  value={editedData.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                />
                <input
                  type="text"
                  name="description"
                  value={editedData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                />
                <button onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <h2>{item.name}</h2>
                <p>{item.price}</p>
                <p>{item.description}</p>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>

              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
