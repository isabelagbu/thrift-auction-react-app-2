import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar.js';
import ThriftItemList from './ThriftItemList.js';

const Home = () => {
  const [thriftItems, setThriftItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/thrift-items')
      .then(response => {
        setThriftItems(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the thrift items!", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/thrift-items/${id}`)
      .then(response => {
        setThriftItems(thriftItems.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the thrift item!", error);
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      axios.get('http://localhost:8000/api/thrift-items')
        .then(response => {
          setThriftItems(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the thrift items!", error);
        });
    } else {
      const filteredItems = thriftItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setThriftItems(filteredItems);
    }
  };

  const handleBid = (id, newBid) => {
    const item = thriftItems.find(item => item._id === id);
    if (!item) {
      console.error("Item not found!");
      return;
    }

    if (newBid > item.currentBid) {
      axios.put(`http://localhost:8000/api/thrift-items/bid/${id}`, { currentBid: newBid })
        .then(response => {
          setThriftItems(thriftItems.map(item => item._id === id ? response.data : item));
        })
        .catch(error => {
          console.error("There was an error updating the bid!", error.response.data);
        });
    } else {
      alert("Bid amount must be higher than the current bid.");
    }
  };

  return (
    <div className="main-content home">
      <h1>Place Your Bids!</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
      <ThriftItemList 
        thriftItems={thriftItems} 
        handleDelete={handleDelete} 
        handleEdit={handleEdit} 
        handleBid={handleBid} 
      />
    </div>
  );
}

export default Home;