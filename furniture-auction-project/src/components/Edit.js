import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState({
    name: '',
    description: '',
    auctionEnd: '',
    imageUrl: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/api/thrift-items/${id}`)
      .then(response => {
        setItem(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the thrift item!", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/thrift-items/edit/${id}`, item)
      .then(() => {
        navigate('/');  // Redirect to home or another page after successful update
      })
      .catch(error => {
        console.error("There was an error updating the thrift item!", error);
      });
  };

  return (
    <div className="main-content">
      <h1>Edit Item</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Auction End Date:
          <input
            type="datetime-local"
            name="auctionEnd"
            value={item.auctionEnd}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL:
          <input
            type="url"
            name="imageUrl"
            value={item.imageUrl}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default Edit;