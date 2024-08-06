import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = (props) => {
  const navigate = useNavigate();
  const [item, setItem] = useState({
    name: '',
    description: '',
    startingBid: '',
    currentBid: '',
    auctionEnd: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/api/thrift-items`, item)
      .then(() => {
        navigate('/');  // Redirect to home or another page after successful creation
      })
      .catch(error => {
        console.error("There was an error creating the thrift item!", error);
      });
  };

  return (
    <div className="main-content">
      <h1>{props.title}</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Starting Bid:
          <input
            type="number"
            name="startingBid"
            value={item.startingBid}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Auction End Date:
          <input
            type="datetime-local"
            name="auctionEnd"
            value={item.auctionEnd}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="url"
            name="imageUrl"
            value={item.imageUrl}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
};

export default Create;