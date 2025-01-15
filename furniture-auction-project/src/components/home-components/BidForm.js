import React, { useState } from 'react';

const BidForm = ({ thriftItem, handleBid }) => {
  const [bidderName, setBidderName] = useState('');

  const handleInvalid = (e) => {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity('Please enter a bid amount.');
    } else if (e.target.validity.rangeUnderflow) {
      e.target.setCustomValidity('Your bid must be higher than the current bid.');
    } else if (e.target.name === 'bidderName' && !e.target.value.trim()) {
      e.target.setCustomValidity('Please enter your name.');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBid = parseFloat(e.target.elements.newBid.value);
    
    // Ensure the name input validity is checked
    if (!e.target.elements.bidderName.value.trim()) {
      e.target.elements.bidderName.setCustomValidity('Please enter your name.');
      e.target.elements.bidderName.reportValidity();
      return;
    }

    // Clear any custom validation messages
    e.target.elements.bidderName.setCustomValidity('');
    handleBid(thriftItem._id, newBid, e.target.elements.bidderName.value.trim());
  };

  return (
    <form className="bid-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="bidderName"
        placeholder="Your Name"
        value={bidderName}
        required
        onChange={(e) => setBidderName(e.target.value)}
        onInvalid={handleInvalid}
        onInput={(e) => e.target.setCustomValidity('')} // Clear custom message when user starts typing
      />
      <input 
        type="number" 
        name="newBid" 
        min={thriftItem.currentBid + 1} 
        step="0.01" 
        required 
        onInvalid={handleInvalid} 
        onInput={(e) => e.target.setCustomValidity('')} // Clear custom message when user starts typing
      />
      <button type="submit">Bid!</button>
    </form>
  );
};

export default BidForm;
