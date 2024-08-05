import React from 'react';
import BidForm from './BidForm';
import CountdownTimer from './CountdownTimer';

const ThriftItem = ({ thriftItem, handleDelete, handleEdit, handleBid }) => {
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <li className="furniture-item">
      <button 
        className="delete-button"
        onClick={() => handleDelete(thriftItem.id)}
      >
        &times;
      </button>
      <button 
        className="edit-button"
        onClick={() => handleEdit(thriftItem._id)}
      >
        &#9998;
      </button>
      <img className="furniture-img" src={thriftItem.imageUrl} alt={thriftItem.name} />
      <h3>{thriftItem.name}</h3>
      <p>{thriftItem.description}</p>
      <p>Starting Bid: ${thriftItem.startingBid}</p>
      <p>Current Bid: ${thriftItem.currentBid}</p>
      <p>Auction End Date: {formatDate(thriftItem.auctionEnd)}</p>
      <BidForm 
        thriftItem={thriftItem} 
        handleBid={handleBid} 
      />
       <CountdownTimer auctionEnd={thriftItem.auctionEnd} />
    </li>
  );
};

export default ThriftItem;